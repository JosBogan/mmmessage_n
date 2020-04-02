var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

const port = process.env.PORT || 4000


// app.use('/api', () => console.log('working'))


io.on('connection', (socket) => {
  console.log('made socket connection')

  socket.on('chat message', (message) => {
    console.log(message)
    io.emit('chat message', message)
  })

  socket.on('disconnect', () => {
    console.log('user has left')
  })
})

http.listen(port, () => console.log('Server is up and listening on port 4000'))

// const io = socket(server)