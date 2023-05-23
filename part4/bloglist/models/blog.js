const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title:{
  type: String,
  required: true},

  author:{
    required: true,
    type:String
  },

  url:{
    required: true,
    type:String
  },

  likes:{
    required: true,
    type: Number
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

