const express = require('express');
const uc = require('./controller/userController')
const app = express();
const db = {
  users: {
    id: 0,
    data: [],
  },
  profiles: {
    id: 0,
    data: [],
  },
  posts: {
    id: 0,
    data: [],
  },
  comments: {
    id: 0,
    data: [],
  },
};

app.set('db', db);
app.use(express.json());
const port = 3001;
app.listen(port, () => { console.log(`Server listening on port: ${port}`); });
app.post('/sign-up', uc.create);
app.get('/debug', uc.debug);
app.patch('/profile/:profileId', uc.update );
app.post('/post', uc.posts);
app.post('/comment', uc.comments);
app.get('/profile', uc.fetchProfile);
app.get('/user/:userId/posts', uc.fetchPost)
app.get('/posts/:postId', uc.viewPost)
