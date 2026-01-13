/**
 * @swagger
 * /api/wallet-ledger/get-all-transcation:
 *   get:
 *     summary: Get all wallet transactions (Admin)
 *     tags:
 *       - Wallet Ledger
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "-createdAt"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: "SUCCESS"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-31"
 *     responses:
 *       200:
 *         description: Transactions fetched successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/wallet-ledger/get-all-my-transaction:
 *   get:
 *     summary: Get logged-in user's wallet transactions (User)
 *     tags:
 *       - Wallet Ledger
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "-createdAt"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: "PENDING"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-31"
 *     responses:
 *       200:
 *         description: User transactions fetched successfully
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/wallet-ledger/get-my-user-transcation:
 *   get:
 *     summary: Get transactions of users created by the logged-in agent (Agent)
 *     tags:
 *       - Wallet Ledger
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "-createdAt"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: "FAILED"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-31"
 *     responses:
 *       200:
 *         description: Agent user transactions fetched successfully
 *       400:
 *         description: Invalid agent ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
