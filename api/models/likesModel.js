import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LikesSchema = new Schema ({
    fullName: {
        type: String,
        trim: true,
        required: true
      },
    
      email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
      },

}, {
    timestamps: true
})

export default mongoose.model('Like', LikesSchema)