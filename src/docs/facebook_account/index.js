/**
 * @swagger
 * components:
 *   schemas:
 *     FacebookAdAccount:
 *       type: object
 *       required:
 *         - user
 *         - license_number
 *         - account_name
 *         - account_id
 *         - timezone
 *         - deposit_amount
 *         - application_fee
 *         - deposit_fee
 *       properties:
 *         user:
 *           type: string
 *           description: User ID
 *           example: 64f1b2c9e123456789abcd12
 *         license_number:
 *           type: string
 *           example: LIC-FB-2024-001
 *         account_name:
 *           type: string
 *           example: My Facebook Ads Account
 *         account_id:
 *           type: string
 *           example: fb_123456789
 *         timezone:
 *           type: string
 *           example: Asia/Kolkata
 *         deposit_amount:
 *           type: number
 *           example: 5000
 *         application_fee:
 *           type: number
 *           example: 500
 *         deposit_fee:
 *           type: number
 *           example: 250
 *         status:
 *           type: string
 *           enum: [active, disabled, deactivated]
 *           example: active
 *
 *     GoogleAdAccount:
 *       type: object
 *       required:
 *         - user
 *         - account_name
 *         - account_id
 *         - timezone
 *         - deposit_amount
 *         - application_fee
 *         - deposit_fee
 *         - promotional_website
 *         - gmail_id
 *       properties:
 *         user:
 *           type: string
 *           example: 64f1b2c9e123456789abcd12
 *         account_name:
 *           type: string
 *           example: My Google Ads Account
 *         account_id:
 *           type: string
 *           example: ga_987654321
 *         timezone:
 *           type: string
 *           example: Asia/Kolkata
 *         deposit_amount:
 *           type: number
 *           example: 10000
 *         application_fee:
 *           type: number
 *           example: 1000
 *         deposit_fee:
 *           type: number
 *           example: 500
 *         promotional_website:
 *           type: string
 *           example: https://example.com
 *         gmail_id:
 *           type: string
 *           example: ads.manager@gmail.com
 *         status:
 *           type: string
 *           enum: [active, disabled, deactivated]
 *           example: active
 */

/**
 * @swagger
 * /api/admin/create-new-facebook-ad-account:
 *   post:
 *     summary: Create a new Facebook Ad Account
 *     tags:
 *       - Admin Ad Accounts
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacebookAdAccount'
 *     responses:
 *       201:
 *         description: Facebook ad account created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Facebook ad account created
 *               data:
 *                 _id: 65a1f2c9e123456789abcd45
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/admin/create-new-google-ad-account:
 *   post:
 *     summary: Create a new Google Ad Account
 *     tags:
 *       - Admin Ad Accounts
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoogleAdAccount'
 *     responses:
 *       201:
 *         description: Google ad account created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Google ad account created
 *               data:
 *                 _id: 65a1f2c9e123456789abcd99
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
