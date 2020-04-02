const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 'flubber'

function register(req, res, next) {
  User
    .create(req.body)
    .then(user => res.status(201).json({ message: `Thank you for registering ${user.username}` }))
    .catch(err => res.status(400).json(err))
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
      return res.status(202).json({ message: `'Welcome ${user.username}`, token })
    })
    .catch(err => res.status(400).json(err))
}

module.exports = { register, login }