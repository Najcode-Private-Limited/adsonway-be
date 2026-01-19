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

/**
 * @swagger
 * /api/user/get-all-my-facebook-accounts:
 *   get:
 *     summary: Fetch Facebook ad account applications for logged-in user with filters
 *     tags:
 *       - Admin Ad Accounts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, disabled, deactivated]
 *         description: Filter by application status
 *
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter applications created after this date
 *
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter applications created before this date
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: integer
 *           enum: [1, -1]
 *           default: -1
 *         description: Sort by createdAt (1 = ASC, -1 = DESC)
 *
 *     responses:
 *       200:
 *         description: Facebook ad applications fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               page: 1
 *               limit: 10
 *               data:
 *                 - _id: 65a1f2c9e123456789abcd45
 *                   license_number: LIC-FB-2024-001
 *                   account_name: My Facebook Ads Account
 *                   account_id: fb_123456789
 *                   timezone: Asia/Kolkata
 *                   deposit_amount: 5000
 *                   application_fee: 500
 *                   deposit_fee: 250
 *                   status: active
 *                   user:
 *                     _id: 64f1b2c9e123456789abcd12
 *                     name: John Doe
 *                     email: john@example.com
 *                   createdAt: 2024-01-15T10:30:00.000Z
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/user/get-all-my-google-accounts:
 *   get:
 *     summary: Fetch Google ad account applications for logged-in user with filters
 *     tags:
 *       - Admin Ad Accounts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, disabled, deactivated]
 *
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: integer
 *           enum: [1, -1]
 *           default: -1
 *
 *     responses:
 *       200:
 *         description: Google ad applications fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               page: 1
 *               limit: 10
 *               data:
 *                 - _id: 65a1f2c9e123456789abcd99
 *                   account_name: My Google Ads Account
 *                   account_id: ga_987654321
 *                   timezone: Asia/Kolkata
 *                   deposit_amount: 10000
 *                   application_fee: 1000
 *                   deposit_fee: 500
 *                   promotional_website: https://example.com
 *                   gmail_id: ads.manager@gmail.com
 *                   status: active
 *                   createdAt: 2024-01-18T12:00:00.000Z
 *
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
