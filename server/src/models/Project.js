const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
})

module.exports = mongoose.model('Project', projectSchema)
