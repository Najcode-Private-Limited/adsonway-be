/**
 * @swagger
 * /api/user/update-profile:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update user profile
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
 *                 example: Jane Doe
 *               username:
 *                 type: string
 *                 example: jane_doe
 *               password:
 *                 type: string
 *                 example: UserPass@123
 *               display_picture:
 *                 type: string
 *                 example: https://cdn.example.com/user.jpg
 *               phone_number:
 *                 type: string
 *                 example: "+917777666555"
 *               organization:
 *                 type: string
 *                 example: Freelancer
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Validation error or password reuse
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
