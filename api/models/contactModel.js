import mongoose from 'mongoose'
import Joi from 'joi'

const Schema = mongoose.Schema

const ContactSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        email: Joi.string().email({
            tlds: {
                allow: ['com', 'net']
            }
        })
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true
})

export default mongoose.model('Contact', ContactSchema)