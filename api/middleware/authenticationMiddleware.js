import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const config = process.env

const loginRequired = async (req, res, next) => {
  // if(req.body.token || req.query.token || req.headers["x-access-token"]) {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(403).send('A token is required for authentication')
    }
    try {
      const decoded = jwt.verify(token, config.JWT_KEY)
      const user = await User.findById(decoded.userId)
      if (!user) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access'
        })
      }
      const userInfo = {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
      req.user = userInfo
      next()
    } catch (err) {
      return res.status(401).send('Invalid Token')
    }
  } else {
    res.status(404).json({
      success: false,
      message: 'You need to login first'
    })
  }
}

const isAdmin = async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user.id
  })
  if (!user) {
    res.status(404)
      .json({
        message: 'User not found'
      })
  } else {
    if (user.isAdmin === true) {
      next()
    } else {
      res.status(401).json({
        message: 'Unauthorized Access!'
      })
    }
  }
}

export {
  loginRequired,
  isAdmin
}
