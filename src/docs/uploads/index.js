/**
 * @swagger
 * /api/upload/upload-file:
 *   post:
 *     tags:
 *       - Uploads
 *     summary: Upload one or more files
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
