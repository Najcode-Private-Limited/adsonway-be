/**
 * @swagger
 * /api/facebook-application-setting/create-setting:
 *   post:
 *     summary: Create or update Facebook application settings
 *     description: Allows admin to configure Facebook application settings such as profile link and business manager ID.
 *     tags: [Facebook Application Setting]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - facebook_profile_link
 *               - bussiness_manager_id
 *             properties:
 *               facebook_profile_link:
 *                 type: string
 *                 format: uri
 *                 example: https://www.facebook.com/john.doe
 *               bussiness_manager_id:
 *                 type: string
 *                 example: 123456789012345
 *     responses:
 *       201:
 *         description: Facebook application setting created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/facebook-application-setting/get-setting:
 *   get:
 *     summary: Get Facebook application settings
 *     description: Fetch the configured Facebook application settings.
 *     tags: [Facebook Application Setting]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Facebook application setting fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 facebook_profile_link:
 *                   type: string
 *                   example: https://www.facebook.com/john.doe
 *                 bussiness_manager_id:
 *                   type: string
 *                   example: 123456789012345
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/facebook-application-setting/update-setting:
 *   put:
 *     summary: Update Facebook application setting
 *     description: Allows admin to update Facebook application settings.
 *     tags: [Facebook Application Setting]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - facebook_profile_link
 *               - bussiness_manager_id
 *             properties:
 *               facebook_profile_link:
 *                 type: string
 *                 format: uri
 *                 example: https://www.facebook.com/john.updated
 *               bussiness_manager_id:
 *                 type: string
 *                 example: 987654321098765
 *     responses:
 *       200:
 *         description: Facebook application setting updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 *       404:
 *         description: Facebook application setting not found
 *       500:
 *         description: Internal server error
 */
