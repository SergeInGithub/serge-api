// Import mongoose
import mongoose from 'mongoose'

// Declare schema and assign Schema class
const Schema = mongoose.Schema

// Create Schema Instance and add schema propertise
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

// create and export model
export default mongoose.model('Post', PostSchema)
