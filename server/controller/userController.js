module.exports = {
    create: function(req, res) {
        const db = req.app.get('db')
        const{ email, password } = req.body
        const id = db.users.id
        const name = email.toUpperCase()
        db.users.data.push({id, email, password})
        db.profiles.data.push({id, email, name})
        db.users.id++
        db.profiles.id++
        res.status(201).json(db)
    },

    debug: function(req,res) {
        res.status(200).json(req.app.get('db'))
    },

    update: function(req, res){
        const db = req.app.get('db')
        const {profileId} = req.params;

        const profileIndex = db.profiles.data.findIndex(profile => profile.id === parseInt(profileId))
        const profile = [db.profiles.data[profileIndex]];
        Object.assign(...profile, req.body)
            
        res.status(200).json(profile)
    },
    posts: function(req, res) {
        const db = req.app.get('db')
        const { userId, posts } = req.body
        const id = db.posts.id
        db.posts.data.push({id, posts, userId})
        db.posts.id++
        res.status(201).json(db)
    },
    comments: function(req, res) {
        const db = req.app.get('db')
        const {userId, postId, comment} = req.body
        const id = db.comments.id 
        db.comments.data.push({ id, userId, postId, comment })
        db.comments.id++
        res.status(201).json(db)

    },
    fetchProfile: function(req, res){
        const db = req.app.get('db')
        const userEmail = req.query.email
        const userId = Number(req.query.id)
        const userIndex = db.profiles.data.findIndex(res => res.email === userEmail);
        const userIndexById = db.profiles.data.findIndex(res => res.id === userId);
        if(req.query.email){
            res.status(200).json(db.profiles.data[userIndex])
        }else if(req.query.id){
            res.status(200).json(db.profiles.data[userIndexById])
        }else{
            res.status(200).json(db)
        }
    },
    fetchPost: function(req, res) {
        const db = req.app.get('db')
        const userPosts = []
        const {userId} = req.params;
        const userIndex = db.profiles.data.findIndex(result => result.id === Number(userId));
        db.posts.data.map(res => {
            if(res.userId===userIndex){
                userPosts.push(res)
            }
        })
        res.status(200).json(userPosts)
    },
    viewPost: function(req, res) {
        const db = req.app.get('db')
        const {postId} = req.params
        const commentList = []
        const postIndex = db.posts.data.findIndex(result => result.id === Number(postId))
        if(req.query.comments===""){
            db.comments.data.map(val => {
                if(val.postId=== Number(postId)){
                    commentList.push(val)
                }
                return commentList;
            })
        }else{
            commentList.push(db.posts.data[postIndex])
        }
        res.status(200).json(commentList)
        }
}



