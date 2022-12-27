/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePostInput:
 *      type: object
 *      required:
 *        - title
 *        - content
 *      properties:
 *        title:
 *          type: string
 *          default: A Rocky is sick
 *        content:
 *          type: string
 *          default: I came and I saw,
 *    CreatePostResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            content:
 *              type: string
 *            _id:
 *              type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    post:
 *      type: object
 *      required:
 *        - title
 *        - content
 *      properties:
 *        title:
 *          type: string
 *        content:
 *          type: string
 */
