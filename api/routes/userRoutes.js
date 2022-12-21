'use strict';

// create App function
    module.exports = function(app) {
      var userHandlers = require('../middleware/authenticationMiddleware');
      const {loginRequired, isAdmin} = userHandlers;
      const {listAllusers, register, signIn} = require('../controllers/authController')



// get and post request for /user endpoints
    app
    .route("/user/all")
    .get([loginRequired, isAdmin], listAllusers)

    // app.route("/user/")
    // .post(userHandlers.loginRequired, postHandlers.createNewpost); // login handler


    // post request for user registration
    app
    .route("/auth/register")
    .post(register);

    // post request for user log in
    app
    .route("/auth/sign_in")
    .post(signIn);
  };
