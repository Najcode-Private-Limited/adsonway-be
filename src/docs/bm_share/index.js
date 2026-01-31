/**
 * @swagger
 * tags:
 *   name: BM Share
 *   description: BM Share management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BMShare:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65f1a2b9c1a4b32e9f1a1111
 *         user:
 *           type: string
 *           example: 65f1a2b9c1a4b32e9f1a2222
 *         shared_id:
 *           type: string
 *           example: BM-12345
 *         account:
 *           type: string
 *           example: Facebook Ads Account
 *         notes:
 *           type: string
 *           example: Please approve this BM access
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           example: 200
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Operation successful
 *         data:
 *           nullable: true
 */

/**
 * @swagger
 * /api/bm-share/apply-bm-share:
 *   post:
 *     summary: Apply for a BM Share
 *     tags: [BM Share]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shared_id
 *               - account
 *             properties:
 *               shared_id:
 *                 type: string
 *                 example: BM-12345
 *               account:
 *                 type: string
 *                 example: Facebook Ads Account
 *               notes:
 *                 type: string
 *                 example: Optional notes
 *     responses:
 *       201:
 *         description: BM Share created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/bm-share/get-bm-share/{id}:
 *   get:
 *     summary: Get BM Share by ID
 *     tags: [BM Share]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: BM Share retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid BM Share ID
 *       404:
 *         description: BM Share not found
 */

/**
 * @swagger
 * /api/bm-share/get-user-bm-shares:
 *   get:
 *     summary: Get all BM Shares for logged-in user
 *     tags: [BM Share]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: sort
 *         schema:
 *           type: number
 *       - in: query
 *         name: startDate
 *         schema:
 *          type: string
 *         format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *         type: string
 *         format: date-time
 *     responses:
 *       200:
 *         description: User BM Shares retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

/**
 * @swagger
 * /api/bm-share/get-all-bm-shares:
 *   get:
 *     summary: Get all BM Shares (Admin)
 *     tags: [BM Share]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: startDate
 *         schema:
 *          type: string
 *         format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *         type: string
 *         format: date-time
 *     responses:
 *       200:
 *         description: All BM Shares retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/bm-share/update-bm-share/{id}:
 *   patch:
 *     summary: Update BM Share by ID
 *     tags: [BM Share]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: BM Share updated successfully
 *       400:
 *         description: Cannot update approved/rejected BM Share
 *       404:
 *         description: BM Share not found
 */
