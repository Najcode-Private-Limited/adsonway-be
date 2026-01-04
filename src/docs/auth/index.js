/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login as (admin/agent/user)
 *     description: Login as (admin/agent/user)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the admin
 *               password:
 *                 type: string
 *                 description: The password of the admin
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the user
 *                     username:
 *                       type: string
 *                       description: The username of the user
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                     full_name:
 *                       type: string
 *                       description: The full name of the user
 *                     role:
 *                       type: string
 *                       description: The role of the user
 *                     display_picture:
 *                       type: string
 *                       description: The display picture of the user
 *                     phone_number:
 *                       type: string
 *                       description: The phone number of the user
 *                     organization:
 *                       type: string
 *                       description: The organization of the user
 *                     disabled:
 *                       type: boolean
 *                       description: The disabled status of the user
 *                 token:
 *                   type: string
 *                   description: The token of the user
 *       401:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the error
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the error
 * */

/**
 * @swagger
 * /api/auth/create-admin:
 *   post:
 *     summary: Create a new admin
 *     description: Create a new admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the admin
 *               password:
 *                 type: string
 *                 description: The password of the admin
 *               full_name:
 *                 type: string
 *                 description: The full name of the admin
 *               email:
 *                 type: string
 *                 description: The email of the admin
 *               phone_number:
 *                 type: string
 *                 description: The phone number of the admin
 *               organization:
 *                 type: string
 *                 description: The organization of the admin
 *     responses:
 *       200:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the error
 *       400:
 *         description: Failed to create admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the error
 * */
