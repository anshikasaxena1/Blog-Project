
import mongoose from 'mongoose'

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
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now // Automatically set the current timestamp when creating a post
  }
});

export default mongoose.model('Post', postSchema);
