// Export mongoose
import mongoose from 'mongoose'

// Assign MongoDB connection string to Uri and declare options settings


// Declare a variable named option and assign optional settings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.set('strictQuery', true)
// Connect MongoDB Atlas using mongoose connect method
const db = () => {
  mongoose.connect(process.env.MONGO_URI, options).then(() => {
    console.log('Database connection established!')
  },
  err => {
    console.log('Error connecting Database instance due to:', err)
  })
}

export default db
