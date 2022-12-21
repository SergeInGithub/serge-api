'use strict';

// create App function
    module.exports = function(app) {
      var userHandlers = require('../middleware/authenticationMiddleware');
      const {loginRequired, isAdmin} = userHandlers;

        var postList = require('../controllers/postController');
        /// import authenticaton middleware
        // var userHandlers = require('../controllers/authController');
// Import validation middleware
const {validate} = require("../middleware/validationMiddleware");
const validation = require("../middleware/schemasValidation/postValidation")

// postList Routes
// get and post request for /posts endpoints
        app
        .route("/post/all")
        .get(postList.listAllposts)
        app
        .route("/post/:id")
        .get(postList.listPost)
        app
        .route("/post/create")
        .post([loginRequired, isAdmin, validate(validation.postValidation)], postList.createNewpost);

// put and delete request for /posts endpoints
        app
        .route("/post/update/:id")
        .patch([loginRequired, isAdmin], postList.updatePost)

        app.route("/post/delete/:id").delete(loginRequired,isAdmin, postList.deletePost);
    };
