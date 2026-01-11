/**
 * @swagger
 * /api/top-up-request/add-top-up-request:
 *   post:
 *     summary: Create a new wallet top-up request
 *     tags:
 *       - Wallet Top-Up
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - transcationId
 *               - paymentMedthodId
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               transcationId:
 *                 type: string
 *                 example: TXN123456789
 *               screenshotUrl:
 *                 type: string
 *                 example: https://cloudinary.com/image.png
 *               remarks:
 *                 type: string
 *                 example: UPI payment
 *               paymentMedthodId:
 *                 type: string
 *                 example: 65f1b2c8e4b0a3a12c999999
 *     responses:
 *       201:
 *         description: Top-up request created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/top-up-request/get-top-up-requests:
 *   get:
 *     summary: Get all wallet top-up requests (Admin only)
 *     tags:
 *       - Wallet Top-Up
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all top-up requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   walletId:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   status:
 *                     type: string
 *                     enum: [pending, approved, rejected]
 *                   transcationId:
 *                     type: string
 *                   screenshotUrl:
 *                     type: string
 *                   remarks:
 *                     type: string
 *                   rejectReason:
 *                     type: string
 *                   paymentMedthodId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 */

/**
 * @swagger
 * /api/top-up-request/get-user-top-up-requests/{id}:
 *   get:
 *     summary: Get all wallet top-up requests for a specific user
 *     tags:
 *       - Wallet Top-Up
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User top-up request list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
