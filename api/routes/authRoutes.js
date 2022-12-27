'use strict'
import express from 'express'
import { listAllUsers, listOneUser, register, signIn } from '../controllers/authController.js'
import { loginRequired, isAdmin } from '../middleware/authenticationMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /auth/all_users:
 *    get:
 *      tags: [user endpoints]
 *      description: Returns all users from our database
 *      responses:
 *        200:
 *          description: Get all users from our API
 */
router.get('/auth/all_users', [loginRequired, isAdmin], listAllUsers) // all users
/**
 * @swagger
 * /auth/get_user/{userId}:
 *    get:
 *      tags: [user endpoints]
 *      summary: returns a one user should provide userId from our database
 *      parameters:
 *        - name: userId
 *          in: path
 *          description: provide userId
 *          required: true
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CreateUserInput'
 *        404:
 *          description: not found
 */
router.get('/auth/get_user/:id', [loginRequired, isAdmin], listOneUser) // individual user

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create user account
 *     tags: [user endpoints]
 *     requestBody:
 *       description: Please fill all required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       '201':
 *         description: Logged in successfully
 */
router.post('/auth/register', register) // create user

/**
 * @swagger
 * /auth/sign_in:
 *   post:
 *     summary: Login to your account
 *     tags: [user endpoints]
 *     requestBody:
 *       description: Please fill all required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       '201':
 *         description: Logged in successfully
 */
router.post('/auth/sign_in', signIn) // user sign in

export default router
