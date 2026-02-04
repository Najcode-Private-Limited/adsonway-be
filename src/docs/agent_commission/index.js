/**
 * @swagger
 * tags:
 *   name: Agent Commission
 *   description: Agent commission calculation and payment tracking
 */

/**
 * @swagger
 * /api/agent-commission/my-report:
 *   get:
 *     summary: Get agent's monthly commission report
 *     tags: [Agent Commission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *         description: Month (1-12). Defaults to current month.
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Year. Defaults to current year.
 *     responses:
 *       200:
 *         description: Report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/AgentCommissionLedger'
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */

/**
 * @swagger
 * /api/agent-commission/my-reports:
 *   get:
 *     summary: Get all monthly reports for agent
 *     tags: [Agent Commission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter by year
 *     responses:
 *       200:
 *         description: Reports fetched successfully
 */

/**
 * @swagger
 * /api/agent-commission/admin/all:
 *   get:
 *     summary: Get all agents commission summary (Admin only)
 *     tags: [Agent Commission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter by year
 *     responses:
 *       200:
 *         description: All agents summary fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       agent:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                       totalCommission:
 *                         type: number
 *                       totalPaid:
 *                         type: number
 *                       totalPending:
 *                         type: number
 *                       reports:
 *                         type: array
 */

/**
 * @swagger
 * /api/agent-commission/admin/agent/{agentId}:
 *   get:
 *     summary: Get commission report for specific agent (Admin only)
 *     tags: [Agent Commission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: agentId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Report generated successfully
 */

/**
 * @swagger
 * /api/agent-commission/admin/agent/{agentId}/pay:
 *   post:
 *     summary: Record payment to agent (Admin only)
 *     tags: [Agent Commission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: agentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - month
 *               - year
 *               - amount
 *             properties:
 *               month:
 *                 type: integer
 *                 example: 1
 *               year:
 *                 type: integer
 *                 example: 2026
 *               amount:
 *                 type: number
 *                 example: 500
 *               remarks:
 *                 type: string
 *                 example: "January payment"
 *     responses:
 *       200:
 *         description: Payment recorded successfully
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: No report found for this month
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AgentCommissionLedger:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         agent:
 *           type: string
 *         month:
 *           type: integer
 *           example: 1
 *         year:
 *           type: integer
 *           example: 2026
 *         totalDeposits:
 *           type: number
 *           example: 10000
 *         totalRefunds:
 *           type: number
 *           example: 500
 *         applicationFees:
 *           type: number
 *           example: 100
 *         calculatedCommission:
 *           type: number
 *           example: 480
 *         paidAmount:
 *           type: number
 *           example: 200
 *         pendingAmount:
 *           type: number
 *           example: 280
 *         payments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               paidAt:
 *                 type: string
 *                 format: date-time
 *               remarks:
 *                 type: string
 */
