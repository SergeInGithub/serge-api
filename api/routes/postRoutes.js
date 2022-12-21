'use strict';

const express = require('express');

var userHandlers = require('../middleware/authenticationMiddleware');

var postList = require('../controllers/postController');

const {loginRequired, isAdmin} = userHandlers;

const {validate} = require("../middleware/validationMiddleware");

const validation = require("../middleware/schemasValidation/postValidation")

const router = express.Router();


/**
 * @swagger
 * /post/all:
 *    get:
 *      tags: [post endpoints]
 *      description: Returns all posts from our database
 *      responses:
 *        200:
 *          description: Get all posts from our API
 */
router.get('/post/all', postList.listAllposts) // all posts
/**
 * @swagger
 * /post/get/{postId}:
 *    get:
 *      tags: [post endpoints]
 *      summary: returns a one post should provide postId from our database
 *      parameters:
 *        - name: postId
 *          in: path
 *          description: provide postId
 *          required: true
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/post'
 *        404:
 *          description: not found
 */
router.get('/post/get/:id', postList.listPost) // individual post
/**
 * @swagger
 * /post/create/:
 *   post:
 *     summary: Create a new post
 *     tags: [post endpoints]
 *     requestBody:
 *       description: please fill all required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *       '201':
 *         description: Created
 */
router.post(
  '/post/create',
  [loginRequired, isAdmin, validate(validation.postValidation)],
  postList.createNewpost
) // create post

/**
 * @swagger
 * /post/update/{postId}:
 *   patch:
 *     summary: Update a post only by admin
 *     tags: [post endpoints]
 *     parameters:
 *      - name: postId
 *        in: path
 *        description: provide postId
 *        required: true
 *     requestBody:
 *       description: please fill all required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *       '201':
 *         description: Created successfully
 */
router.patch(
  '/post/update/:id',
  [loginRequired, isAdmin, validate(validation.postValidation)],
  postList.updatePost
) // update post
/**
 * @swagger
 * /post/delete/{postId}:
 *    delete:
 *      tags: [post endpoints]
 *      summary: deleting one post
 *      parameters:
 *        - name: postId
 *          in: path
 *          description: provide postId
 *          required: true
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/post'
 *        404:
 *          description: not found
 */
router.delete('/post/delete/:id', [loginRequired, isAdmin], postList.deletePost) // delete post

module.exports = router