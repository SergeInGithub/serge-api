// Import DB Connection
import db from './config/db.js'

// require express
import express from 'express'

// import swagger config
import swaggerDocs from './swagger/swagger.js'

// import jsonwebtoken
import jwt from 'jsonwebtoken'

import postRouter from './api/routes/postRoutes.js'
import authRouter from './api/routes/authRoutes.js'
db()
// create express app
const app = express()

// define port to run express app
const port = process.env.PORT || 9000

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
// Add endpoint
app.get('/', (req, res) => {
  res.send('Hello World')
})

// Token Verification
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTfulAPIs', (err, decode) => {
      if (err) req.user = undefined
      req.user = decode
      next()
    })
  } else {
    req.user = undefined
    next()
  }
})

// API endpoint

// Listen to server
export default app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  swaggerDocs(app, port)
  app.use((req, res) => {
    res.status(404).json({
      message: "Page doesn't exist"
    })
  })
})

app.use(postRouter)
app.use(authRouter)
