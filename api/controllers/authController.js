// import User model
import User from '../models/userModel.js'

// import jsonwebtoken
import jwt from 'jsonwebtoken'

import { config } from 'dotenv'
config()

// DEFINE CONTROLLER FUNCTIONS

// List all users
const listAllUsers = (req, res) => {
  const allUsers = User.find()
  if (!allUsers) {
    res.status(500).json({ message: 'Server Error - Try again later.' })
  } else {
    res.status(200).json(allUsers)
  }
}

const listOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })

    if (!user) {
      res.status(404).json({
        message: 'User not found'
      })
    } else {
      res.status(200).json(user)
    }
  } catch (error) {
    console.log('Error while fetching user: ', error.message)
  }
}

// User Register function
const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body
    const isNewUser = await User.isThisEmailInUse(email)
    if (!isNewUser) {
      return res.status(409).json({
        success: false,
        message: 'This email is already in use'
      })
    }
    const user = await User({
      fullName,
      email,
      password
    })
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating user: ${error.message}`
    })
  }
}

// User Sign function
const signIn = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    return res.json({
      success: false,
      message: 'User not found that matches this email'
    })
  }

  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    return res.json({
      success: false,
      message: 'Password does not match given email'
    })
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
    expiresIn: '1d'
  })

  const userInfo = {
    fullName: user.fullName,
    email: user.email,
    token
  }
  res.status(200).json(userInfo)
}

export {
  listAllUsers,
  listOneUser,
  register,
  signIn
}
