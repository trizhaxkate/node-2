function create(req, res) {
  const db = req.app.get('db');

  const { userId, content } = req.body;

  const newPost = { id: db.posts.id, userId, content };

  db.posts.data.push(newPost);
  db.posts.id++;

  res.status(201).json(newPost);
}

function getUserPosts(req, res) {
  const db = req.app.get('db');
  const { userId } = req.params;
  const posts = db.posts.data.filter(p => p.userId === parseInt(userId));

  res.status(200).json(posts);
}

function getPost(req, res) {
  const db = req.app.get('db')
  const { comments } = req.query
  const { postId } = req.params

  const postRes = db.posts.data.find(p => p.id === parseInt(postId))
  if (comments) {
    const postComments = db.comments.data.filter(c => c.postId === parseInt(postId))
    postRes.comments = postComments
  }

  res.status(200).json(postRes)
}

module.exports = {
  create,
  getUserPosts,
  getPost,
};
