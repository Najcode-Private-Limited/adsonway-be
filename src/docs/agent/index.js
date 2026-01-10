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
 *
 *               facebook_commission:
 *                 type: number
 *                 example: 10
 *               google_commission:
 *                 type: number
 *                 example: 10
 *               snapchat_commission:
 *                 type: number
 *                 example: 10
 *               tiktok_commission:
 *                 type: number
 *                 example: 10
 *
 *               facebook_application_fee:
 *                 type: number
 *                 example: 5
 *               google_application_fee:
 *                 type: number
 *                 example: 5
 *               snapchat_application_fee:
 *                 type: number
 *                 example: 5
 *               tiktok_application_fee:
 *                 type: number
 *                 example: 5
 *
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

/**
 * @swagger
 * /api/agent/update-profile:
 *   patch:
 *     tags:
 *       - Agent
 *     summary: Update agent profile
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
 *                 example: Agent Smith
 *               username:
 *                 type: string
 *                 example: agent_smith
 *               password:
 *                 type: string
 *                 example: AgentPass@123
 *               display_picture:
 *                 type: string
 *                 example: https://cdn.example.com/agent.jpg
 *               phone_number:
 *                 type: string
 *                 example: "+918888777666"
 *               organization:
 *                 type: string
 *                 example: Sales Team
 *     responses:
 *       200:
 *         description: Agent profile updated successfully
 *       400:
 *         description: Validation error or password reuse
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Agent not found
 *       500:
 *         description: Server error
 */
