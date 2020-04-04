const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const logger = require('./lib/logger')
const router = require('./config/router')

const socketSecureRoute = require('./lib/secureRoute')

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/mmmessage'

const port = process.env.PORT || 4000

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.log(err)
  console.log('Mongo is connected!')
})

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

io.on('connection', (socket) => {
  console.log('made socket connection')
  console.log(socket.handshake.headers)
  // io.use((socket, next) => {
  //   console.log(socket.handshake.headers)
  //   next()
  // })

  socket.on('chat message', (message) => {
    console.log(socket.handshake.headers['Authorization'])
    console.log(message)


    io.emit('chat message', message)
  })

  socket.on('disconnect', () => {
    console.log('user has left')
  })
})

http.listen(port, () => console.log('Server is up and listening on port 4000'))
