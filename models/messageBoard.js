const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  text: { type: String, maxlength: 400, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true }, 
  user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' }
}, {
  timestamps: true
})

const messageBoardSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  messages: [ messageSchema ],
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('MessageBoard', messageBoardSchema)