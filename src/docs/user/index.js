/**
 * @swagger
 * /api/user/update-profile:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Jane Doe
 *               username:
 *                 type: string
 *                 example: jane_doe
 *               password:
 *                 type: string
 *                 example: UserPass@123
 *               display_picture:
 *                 type: string
 *                 example: https://cdn.example.com/user.jpg
 *               phone_number:
 *                 type: string
 *                 example: "+917777666555"
 *               organization:
 *                 type: string
 *                 example: Freelancer
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Validation error or password reuse
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/user/get-my-wallet:
 *   get:
 *     summary: Get my wallet
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wallet not found
 */

/**
 * @swagger
 * /api/user/add-money-to-google-account/{id}:
 *   post:
 *     summary: Add money to Google account (USER)
 *     tags: [Account Topup]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Google Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopupRequest'
 *     responses:
 *       201:
 *         description: Top-up request created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/user/add-money-to-facebook-account/{id}:
 *   post:
 *     summary: Add money to Facebook account (USER)
 *     tags: [Account Topup]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facebook Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopupRequest'
 *     responses:
 *       201:
 *         description: Top-up request created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/user/get-all-my-google-account-topup-requests:
 *   get:
 *     summary: Get all Google account top-up requests of logged-in user
 *     tags: [Account Topup]
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
 *     responses:
 *       200:
 *         description: List of Google top-up requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GoogleTopupResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/user/get-all-my-facebook-account-topup-requests:
 *   get:
 *     summary: Get all Facebook account top-up requests of logged-in user
 *     tags: [Account Topup]
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
 *     responses:
 *       200:
 *         description: List of Facebook top-up requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FacebookTopupResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TopupRequest:
 *       type: object
 *       required:
 *         - amount
 *         - transcationId
 *         - paymentMethodId
 *       properties:
 *         amount:
 *           type: number
 *           example: 500
 *         remarks:
 *           type: string
 *           example: Initial topup
 *
 *     GoogleTopupResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         walletId:
 *           type: string
 *         account:
 *           type: string
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     FacebookTopupResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/GoogleTopupResponse'
 */
