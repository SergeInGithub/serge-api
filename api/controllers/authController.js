// import User model
const User = require("../models/userModel");

// import jsonwebtoken
jwt = require('jsonwebtoken'),

  // import bcryptjs - hashing function
  bcrypt = require('bcryptjs');

  require("dotenv").config();

//DEFINE CONTROLLER FUNCTIONS

// List all users
exports.listAllUsers = (req, res) => {
  let allUsers = User.find({}, (err, users) => {
    if (err) {
      res.status(500).send({
        message: err
      });
    } else {
      res.status(200).json(users)
    }
  })
}

exports.listOneUser = async (req, res) => {

  try{
    const user = await User.findOne({ _id: req.params.id})

    if(!user){
      res.status(404).json({
        message: "User not found"
      })
    } else{
      res.status(200).json(user)
    }
  } catch(error){
    console.log("Error while fetching user: ", error.message)
  }
}

// User Register function
exports.register = async (req, res) => {

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

};

// User Sign function
exports.signIn = async (req, res) => {

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

};
