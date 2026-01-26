/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         full_name:
 *           type: string
 *           example: Farish Jamal
 *         email:
 *           type: string
 *           format: email
 *           example: farish@example.com
 *         username:
 *           type: string
 *           example: farish_j
 *         role:
 *           type: string
 *           enum: [admin, agent, user]
 *           example: agent
 *         createdBy:
 *           type: string
 *           nullable: true
 *           example: 507f1f77bcf86cd799439010
 *         disabled:
 *           type: boolean
 *           example: false
 *         isVerified:
 *           type: boolean
 *           example: true
 *         display_picture:
 *           type: string
 *           nullable: true
 *           example: https://cdn.app.com/avatar.png
 *         phone_number:
 *           type: string
 *           nullable: true
 *           example: "+91XXXXXXXXXX"
 *         organization:
 *           type: string
 *           example: My Company
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/admin/create-admin:
 *   post:
 *     summary: Admin creates an admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - username
 *               - password
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Agent One
 *               email:
 *                 type: string
 *                 example: agent1@example.com
 *               username:
 *                 type: string
 *                 example: agent_one
 *               password:
 *                 type: string
 *                 example: StrongPass@123
 *               role:
 *                 type: string
 *                 example: admin
 *                 default: admin
 *     responses:
 *       201:
 *         description: Agent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Only admin can create agents
 */

/**
 * @swagger
 * /api/admin/create-agent:
 *   post:
 *     summary: Admin creates a Agent
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - username
 *               - password
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: User One
 *               email:
 *                 type: string
 *                 example: user1@example.com
 *               username:
 *                 type: string
 *                 example: user_one
 *               password:
 *                 type: string
 *                 example: UserPass@123
 *               role:
 *                 type: string
 *                 example: admin
 *                 default: admin
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Only agent can create users
 */

/**
 * @swagger
 * /api/admin/get-admins:
 *   get:
 *     summary: Get all admins
 *     description: Fetches a list of all admin users. Accessible only by admins.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/get-agents:
 *   get:
 *     summary: Get all agents
 *     description: Fetches all agents created in the system. Accessible only by admins.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of agents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/get-users/{id}:
 *   get:
 *     summary: Get users created by a specific agent
 *     description: Fetches all users created by the given agent ID. Accessible only by admins.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Agent ID
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439012
 *     responses:
 *       200:
 *         description: List of users under the agent
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid agent ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/update-profile:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Update admin profile
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
 *                 example: John Doe
 *               username:
 *                 type: string
 *                 example: admin_john
 *               password:
 *                 type: string
 *                 example: StrongPass@123
 *               display_picture:
 *                 type: string
 *                 example: https://cdn.example.com/admin.jpg
 *               phone_number:
 *                 type: string
 *                 example: "+919876543210"
 *               organization:
 *                 type: string
 *                 example: Acme Corp
 *     responses:
 *       200:
 *         description: Admin profile updated successfully
 *       400:
 *         description: Validation error or password reuse
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/admin/get-all-user:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all users (Admin only)
 *     description: Admin-only API to fetch all users with search support.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search users by name, email, or phone number
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "65a9c7e2f8b9a0123abc4567"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *                       phone:
 *                         type: string
 *                         example: "9876543210"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized – Admin token missing or invalid
 *       403:
 *         description: Forbidden – Not an admin
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/get-all-google-id-topup-requests:
 *   get:
 *     summary: Get all Google account top-up requests (Admin)
 *     description: Admin can view all Google ID top-up requests with pagination and filters
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GoogleTopupResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/admin/get-all-facebook-id-topup-requests:
 *   get:
 *     summary: Get all Facebook account top-up requests (Admin)
 *     description: Admin can view all Facebook ID top-up requests with pagination and filters
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FacebookTopupResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/admin/update-google-ad-account-deposit/{id}:
 *   patch:
 *     summary: Update Google Ad Account Deposit Status
 *     description: Admin can approve or reject a Google Ad account deposit request.
 *     tags: [Account Topup]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Google Ad Account Deposit ID
 *         schema:
 *           type: string
 *           example: 64f9e3a7c9d8a123456789ab
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected, pending]
 *                 example: approved
 *               reject_reason:
 *                 type: string
 *                 example: Invalid transaction screenshot
 *     responses:
 *       200:
 *         description: Google Ad account deposit updated successfully
 *       400:
 *         description: Invalid Google Ad account ID or update failed
 */

/**
 * @swagger
 * /api/admin/update-facebook-ad-account-deposit/{id}:
 *   patch:
 *     summary: Update Facebook Ad Account Deposit Status
 *     description: Admin can approve or reject a Facebook Ad account deposit request.
 *     tags: [Account Topup]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Facebook Ad Account Deposit ID
 *         schema:
 *           type: string
 *           example: 64f9e3a7c9d8a123456789ab
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected, pending]
 *                 example: rejected
 *               reject_reason:
 *                 type: string
 *                 example: Payment verification failed
 *     responses:
 *       200:
 *         description: Facebook Ad account deposit updated successfully
 *       400:
 *         description: Invalid Facebook Ad account ID or update failed
 */

/**
 * @swagger
 * /api/admin/modify-user-wallet/{id}:
 *   patch:
 *     summary: Modify user wallet balance (credit or debit)
 *     description: Admin can credit or debit a user's wallet and create a wallet ledger entry.
 *     tags:
 *       - Wallet Top-Up
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID whose wallet needs to be modified
 *         schema:
 *           type: string
 *           example: 64e8a7f5c2a9d9c0b1234567
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transcationType
 *               - amount
 *               - transcationId
 *               - paymentMethod
 *               - remarks
 *             properties:
 *               transcationType:
 *                 type: string
 *                 enum: [credit, debit]
 *                 example: credit
 *               amount:
 *                 type: number
 *                 example: 500
 *               transcationId:
 *                 type: string
 *                 example: TXN123456
 *               paymentMethod:
 *                 type: string
 *                 example: UPI
 *               remarks:
 *                 type: string
 *                 example: Admin wallet adjustment
 *     responses:
 *       200:
 *         description: Wallet modified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: User wallet modified successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid input or insufficient balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: Insufficient balance
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: User wallet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: User wallet not found
 *                 success:
 *                   type: boolean
 *                   example: false
 */
