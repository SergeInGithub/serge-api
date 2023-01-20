/**
 * @openapi
 * components:
 *  schemas:
 *    SendSMS:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - subject
 *        - message
 *      properties:
 *        username:
 *          type: string
 *          default: User10X
 *        email:
 *          type: string
 *          default: smsUser@gmail.com,
 *        subject:
 *          type: string
 *          default: The wonderful Map,
 *        message:
 *          type: string
 *          default: I really like what you done with the map,
 *    CreatePostResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            subject:
 *              type: string
 *            message:
 *              type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    GetSMS:
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
