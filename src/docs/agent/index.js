/**
 * @swagger
 * /api/agent/create-user:
 *   post:
 *     summary: Agent creates a User
 *     tags: [Agent]
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
 * /api/agent/get-associated-users:
 *   get:
 *     summary: Get all associated users for an agent
 *     description: Fetches all users created by a specific agent. Accessible only by that agent.
 *     tags: [Agent]
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
