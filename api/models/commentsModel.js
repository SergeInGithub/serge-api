import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentsSchema = new Schema ({

      comment: {
        type: String,
        required: true,
      },

      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }

}, {
    timestamps: true
})

export default mongoose.model('Comment', CommentsSchema)