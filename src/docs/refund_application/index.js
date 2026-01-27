/**
 * @swagger
 * /api/refund-application/create-refund-application:
 *   post:
 *     summary: Create a new refund application
 *     description: Allows a logged-in user to create a refund application.
 *     tags:
 *       - Refund Application
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - platform
 *               - account_name
 *               - requested_amount
 *               - fees_amount
 *               - total_refund_amount
 *               - reason
 *             properties:
 *               platform:
 *                 type: string
 *                 example: Google
 *               account_name:
 *                 type: string
 *                 example: John Ads Account
 *               requested_amount:
 *                 type: number
 *                 example: 1000
 *               fees_amount:
 *                 type: number
 *                 example: 50
 *               total_refund_amount:
 *                 type: number
 *                 example: 950
 *               account_id:
 *                 type: string
 *                 example: 123-456-7890
 *               reason:
 *                 type: string
 *                 example: Campaign stopped
 *     responses:
 *       201:
 *         description: Refund application created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/refund-application/get-my-refund-applications:
 *   get:
 *     summary: Get logged-in user's refund applications
 *     description: Fetch paginated refund applications for the logged-in user.
 *     tags:
 *       - Refund Application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           example: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: pending
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           example: 2024-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: 2024-12-31
 *     responses:
 *       200:
 *         description: Refund applications retrieved successfully
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/refund-application/get-all-refund-applications:
 *   get:
 *     summary: Get all refund applications (Admin)
 *     description: Admin can retrieve all refund applications with filters.
 *     tags:
 *       - Refund Application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           example: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: approved
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           example: 2024-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: 2024-12-31
 *     responses:
 *       200:
 *         description: Refund applications retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/refund-application/get-refund-application/{id}:
 *   get:
 *     summary: Get refund application by ID (Admin)
 *     description: Admin can retrieve a specific refund application using its ID.
 *     tags:
 *       - Refund Application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 65a9e8f0b2c4a1d9e1234567
 *     responses:
 *       200:
 *         description: Refund application retrieved successfully
 *       400:
 *         description: Invalid refund application ID
 *       404:
 *         description: Refund application not found
 */
