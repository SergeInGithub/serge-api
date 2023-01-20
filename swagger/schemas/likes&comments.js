/**
 * @swagger
 * components:
 *  schemas:
 *    AddLike:
 *    CreateLikeResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            fullName:
 *              type: string
 *            email:
 *              type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    AddComment:
 *      type: object
 *      required:
 *        - comment
 *      properties:
 *        comment:
 *          type: string
 *          default: I really like this blog
 *    CreatePostResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 */
