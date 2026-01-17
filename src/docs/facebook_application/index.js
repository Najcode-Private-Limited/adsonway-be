/**
 * @swagger
 * /api/user/apply-facebook-ad:
 *   post:
 *     summary: Apply for Facebook Ad account(s)
 *     description: Allows a user to apply for Facebook Ad accounts. A submission fee will be deducted from the user's wallet.
 *     tags: [Facebook Ad Application]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - licenseType
 *               - licenseNumber
 *               - numberOfPages
 *               - hasFullAdminAccess
 *               - numberOfDomains
 *               - numberOfAccounts
 *               - submissionFee
 *               - adAccounts
 *             properties:
 *               licenseType:
 *                 type: string
 *                 enum: [new, existing]
 *                 example: new
 *               licenseNumber:
 *                 type: string
 *                 example: LIC-12345
 *               numberOfPages:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 3
 *               pageUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://facebook.com/page1
 *                   - https://facebook.com/page2
 *               hasFullAdminAccess:
 *                 type: boolean
 *                 example: true
 *               numberOfDomains:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *               domainUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://example.com
 *               numberOfAccounts:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 2
 *               submissionFee:
 *                 type: number
 *                 example: 20
 *                 description: Submission fee to be deducted from the user's wallet
 *               adAccounts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - accountName
 *                     - timeZone
 *                     - amount
 *                   properties:
 *                     accountName:
 *                       type: string
 *                       example: Main Ads
 *                     timeZone:
 *                       type: string
 *                       example: Asia/Kolkata
 *                     amount:
 *                       type: number
 *                       minimum: 100
 *                       example: 500
 *               remarks:
 *                 type: string
 *                 example: Please process quickly
 *     responses:
 *       201:
 *         description: Facebook Ad application created successfully
 *       400:
 *         description: Validation error or insufficient wallet balance
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/get-all-my-facebook-ad-applications:
 *   get:
 *     summary: Get all Facebook Ad applications of the logged-in user
 *     description: Fetches all Facebook Ad applications submitted by the authenticated user.
 *     tags: [Facebook Ad Application]
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
 *         description: Sort by createdAt (1 = asc, -1 = desc)
 *     responses:
 *       200:
 *         description: List of user's Facebook Ad applications
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
 * /api/admin/get-all-facebook-ad-applications:
 *   get:
 *     summary: Get all Facebook Ad applications (Admin)
 *     description: Fetches all Facebook Ad applications in the system with pagination, sorting, and filters.
 *     tags: [Facebook Ad Application]
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
 *         description: Sort by createdAt (1 = asc, -1 = desc)
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
 *         description: Filter applications created from this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-31
 *         description: Filter applications created until this date
 *     responses:
 *       200:
 *         description: List of all Facebook Ad applications
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

/**
 * @swagger
 * /api/admin/update-facebook-ad-application-status/{id}:
 *   patch:
 *     summary: Update Facebook Ad application status
 *     description: Allows an admin to update the status of a Facebook Ad application and add an optional admin note.
 *     tags: [Facebook Ad Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facebook Ad application ID
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
 *                 enum: [pending, approved, rejected]
 *                 example: approved
 *               adminNote:
 *                 type: string
 *                 example: Approved after verification
 *     responses:
 *       200:
 *         description: Facebook Ad application status updated successfully
 *       400:
 *         description: Invalid request or update failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 *       500:
 *         description: Internal server error
 */
