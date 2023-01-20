import express from "express";
import { sendMessage, listAllMessages } from "../controllers/postController.js";

const router = express.Router();

/**
 * @swagger
 * /contact/:
 *   post:
 *     summary: Send Messages
 *     tags: [Feedback endpoints]
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

export default router;
