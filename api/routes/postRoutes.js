import express from "express";

import {
  loginRequired,
  isAdmin,
} from "../middleware/authenticationMiddleware.js";

import {
  listAllposts,
  listPost,
  createNewpost,
  updatePost,
  deletePost,
  addLike,
  addComment,
  sendMessage,
  listAllMessages,
} from "../controllers/postController.js";

import { validate } from "../middleware/validationMiddleware.js";

import validation from "../middleware/schemasValidation/postValidation.js";

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
router.get("/post/all", listAllposts); // all posts
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
router.get("/post/get/:id", listPost); // individual post
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
  "/post/create",
  [loginRequired, isAdmin, validate(validation.postValidation)],
  createNewpost
); // create post

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
  "/post/update/:id",
  [loginRequired, isAdmin, validate(validation.postValidation)],
  updatePost
); // update post
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
router.delete("/post/delete/:id", [loginRequired, isAdmin], deletePost); // delete post

/**
 * @swagger
 * /post/get/{id}/likes:
 *   post:
 *     summary: Add like
 *     tags: [feedback endpoints]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: provide postId
 *        required: true
 *     responses:
 *       '201':
 *         description: Blog successfully liked
 *       '401':
 *         description: Unauthorized access
 */
router.post("/post/get/:id/likes", addLike);

/**
 * @swagger
 * /post/get/{id}/comments:
 *   post:
 *     summary: Add comment
 *     tags: [feedback endpoints]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: provide postId
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddComment'
 *     responses:
 *       '201':
 *         description: Successfully added comment
 *       '401':
 *         description: Unauthorized access
 */
router.post("/post/get/:id/comments", addComment);

/**
 * @swagger
 * /contact/:
 *   post:
 *     summary: Send Messages
 *     tags: [feedback endpoints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendSMS'
 *     responses:
 *       '201':
 *         description: Message successfully sent
 */
router.post("/contact", sendMessage);

/**
 * @swagger
 * /contact/messages:
 *    get:
 *      tags: [feedback endpoints]
 *      description: Returns all messages from our database
 *      responses:
 *        200:
 *          description: Messages successfully retrieved
 */
router.get("/contact/messages", listAllMessages);

export default router;
