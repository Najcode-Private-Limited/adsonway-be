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
