const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 'flubber'

function secureRoute (req, res, next) {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' })
  const token = req.headers.authorization.replace('Bearer ', '')
  
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
    .then(payload => {
      return User.findById(payload.sub)
    })
    .then(user => {
      if (!user) return res.status(401).json({ message: 'Unauthorized' })
      req.currentUser = user
      next()
    })
    .catch(() => res.status(401).json({ message: 'Unauthorised' }))
}

function socketSecureRoute(packet, next) {
  // console.log('here')
  console.log(packet)
  // .handshake.headers['x-clientid']
  // if (isValid(clientId)) {
  //   return next()
  // }
  // return next(new Error('authentication error'))
  next()
}

module.exports = { secureRoute, socketSecureRoute }