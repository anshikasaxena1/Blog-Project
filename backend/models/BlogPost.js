
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now // Automatically set the current timestamp when creating a post
  }
});

module.exports = mongoose.model('Post', postSchema);
