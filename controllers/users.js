const User = require('../models/user')

function index(req, res) {
  User
    .find()
    .then(users => {
      // console.log(req.currentUser)
      const foundUsers = users.filter(user => user._id.toString() !== req.currentUser._id.toString())
      res.status(200).json(foundUsers)
    })
    .catch(err => res.status(400).json(err))
}

module.exports = { index }