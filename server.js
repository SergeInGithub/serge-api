'use strict'
// Import DB Connection
require("./config/db");

// require express
const express = require("express");

// import swagger config
const swaggerDocs = require('./swagger') 

// import jsonwebtoken
const jwt = require('jsonwebtoken');

// create express app
const app = express();


// define port to run express app
const port = process.env.PORT || 9000;


app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
// Add endpoint
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Token Verification
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTfulAPIs', (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// API endpoint


// Listen to server
module.exports = app.listen(port, () => {

  console.log(`Server running at http://localhost:${port}`);
  swaggerDocs(app, port)
});


// Import API route
var postRoutes = require('./api/routes/postRoutes'); //importing route
const authRoutes = require("./api/routes/userRoutes");
authRoutes(app);
postRoutes(app);


app.use((req, res) => {
  res.status(404).json({
    message: "Page doesn't exist"
  });
});