/**
 * @swagger
 * /api/user/apply-google-ad:
 *   post:
 *     summary: Apply for Google Ad account(s)
 *     description: Allows a user to apply for one or more Google Ad accounts. A submission fee will be deducted from the user's wallet.
 *     tags: [Google Ad Application]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numberOfAccounts
 *               - gmailId
 *               - promotionalWebsite
 *               - adAccounts
 *             properties:
 *               numberOfAccounts:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 1
 *               gmailId:
 *                 type: string
 *                 format: email
 *                 example: ads.manager@gmail.com
 *               promotionalWebsite:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com
 *               remarks:
 *                 type: string
 *                 example: Need multiple ad accounts for different regions
 *               submissionFee:
 *                 type: number
 *                 example: 50
 *               adAccounts:
 *                 type: array
 *                 minItems: 1
 *                 maxItems: 5
 *                 items:
 *                   type: object
 *                   required:
 *                     - accountName
 *                     - timeZone
 *                     - amount
 *                   properties:
 *                     accountName:
 *                       type: string
 *                       example: Ecom US Ads
 *                     timeZone:
 *                       type: string
 *                       example: America/New_York
 *                     amount:
 *                       type: number
 *                       minimum: 100
 *                       example: 500
 *     responses:
 *       201:
 *         description: Google Ad application created successfully
 *       400:
 *         description: Validation error or insufficient wallet balance
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/get-all-my-google-ad-applications:
 *   get:
 *     summary: Get all Google Ad applications of the logged-in user
 *     description: Fetches all Google Ad applications submitted by the authenticated user with pagination and sorting support.
 *     tags: [Google Ad Application]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: integer
 *           enum: [1, -1]
 *           example: -1
 *         description: Sort by createdAt (1 = ascending, -1 = descending)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: Filter applications by status
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-01
 *         description: Filter applications created from this date (inclusive)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-31
 *         description: Filter applications created until this date (inclusive)
 *     responses:
 *       200:
 *         description: List of user's Google Ad applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/get-all-google-ad-applications:
 *   get:
 *     summary: Get all Google Ad applications (Admin)
 *     description: Fetches all Google Ad applications in the system with pagination, sorting, and filters.
 *     tags: [Google Ad Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: integer
 *           enum: [1, -1]
 *           example: -1
 *         description: Sort by createdAt (1 = ascending, -1 = descending)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: Filter applications by status
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-01
 *         description: Filter applications created from this date (inclusive)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-31
 *         description: Filter applications created until this date (inclusive)
 *     responses:
 *       200:
 *         description: List of all Google Ad applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 *       500:
 *         description: Internal server error
 */
