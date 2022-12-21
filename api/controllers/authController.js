// import User model
const User = require("../models/userModel");

// import jsonwebtoken
jwt = require('jsonwebtoken'),

  // import bcryptjs - hashing function
  bcrypt = require('bcryptjs');

  require("dotenv").config();

//DEFINE CONTROLLER FUNCTIONS

// List all users
exports.listAllusers = (req, res) => {
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

  // const user = await User.findOne({email: req.body.email})
  // if(user){
  //   res.status(404).json({message: "Email already in use"})
  // } else{
  //   try{
  //     const newUser = await new User(req.body);
  //     newUser.password = bcrypt.hashSync(req.body.password, 10);
  //     await newUser.save()
  //     console.log("This is newUser: ", newUser)
  //     newUser.password = undefined;
  //     res.status(201).json(newUser);
  //   } catch(error){
  //     console.log("Error while creating user: ", error.message)
  //   }
  // }

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

  // const user = await User.findOne({
  //   email: req.body.email
  // })
  // if (!user) {
  //   res.status(402).json({
  //     message: 'Authentication failed. User not found.'
  //   });
  // } else{
  //   if (!user.comparePassword(req.body.password)) {
  //     res.status(402).json({
  //       message: 'Authentication failed. Wrong password.'
  //     });
  //   } else {
  //     const token = jwt.sign({
  //       userId: user._id
  //     }, process.env.JWT_KEY, {
  //       expiresIn: '1d'
  //     })
  //     const userData = {
  //       fullName: user.fullName,
  //       email: user.email,
  //       token
  //     }
  //     res.status(200).json(
  //       userData
  //     );
  //   }
  // }



};

// User Register function
exports.loginRequired = (req, res, next) => {
  if (req.user) {
    // res.json({ message: 'Authorized User, Action Successful!'});
    next()
  } else {
    res.status(401).json({
      message: 'Unauthorized user!'
    });
  }
};
