function findProfileByUserId(db, id) {
  const index = db.profiles.data.findIndex(p => p.userId === parseInt(id));
  return {
    index,
    data: db.profiles.data[index],
  };
}

function findProfileByUserEmail(db, email) {
  const user = db.users.data.find(u => u.email === email)
  return db.profiles.data.find(p => p.userId === user.id)
}

function update(req, res) {
  const db = req.app.get('db');
  const { thumbnail, about } = req.body;

  const profile = findProfileByUserId(db, req.params.userId);

  const updatedProfile = {
    ...profile.data,
    ...(thumbnail && { thumbnail }),
    ...(about && { about }),
  };

  db.profiles.data.splice(profile.index, 1, updatedProfile);

  res.status(200).json(updatedProfile);
}

function get(req, res) {
  const db = req.app.get('db')
  const { email, userId }= req.query

  let result;
  if (email) {
    result = findProfileByUserEmail(db, email)
  } else if (userId) {
    result = db.profiles.data.find(p => p.userId === parseInt(userId))
  }

  res.status(200).json(result)
}

module.exports = {
  get,
  update,
}
