// import express from "express";
// import {
//   loginRequired,
//   isAdmin,
// } from "../middleware/authenticationMiddleware.js";
// import { validate } from "../middleware/validationMiddleware.js";
// import validation from "../middleware/schemasValidation/postValidation.js";

// import { addLike, addComment } from "../controllers/postController.js";

// const router = express.Router();

// /**
//  * @swagger
//  * /post/get/{id}/likes:
//  *   post:
//  *     summary: Add like
//  *     tags: [Feedback endpoints]
//  *     parameters:
//  *      - name: id
//  *        in: path
//  *        description: provide postId
//  *        required: true
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/AddLike'
//  *     responses:
//  *       '201':
//  *         description: Blog successfully liked
//  *       '401':
//  *         description: Unauthorized access
//  */
// router.post("/post/get/:id/likes", addLike);

// /**
//  * @swagger
//  * /post/get/{id}/comments:
//  *   post:
//  *     summary: Add comment
//  *     tags: [Feedback endpoints]
//  *     parameters:
//  *      - name: id
//  *        in: path
//  *        description: provide postId
//  *        required: true
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/AddComment'
//  *     responses:
//  *       '201':
//  *         description: Successfully added comment
//  *       '401':
//  *         description: Unauthorized access
//  */
// router.post("/post/get/:id/comments", addComment);

// export default router;
