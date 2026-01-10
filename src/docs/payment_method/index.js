/**
 * @swagger
 * tags:
 *   name: Payment Method
 *   description: Admin APIs for managing payment methods
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     PaymentMethod:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65a8f12c9b2e4f0012abcd34
 *         name:
 *           type: string
 *           example: Credit Card
 *         description:
 *           type: string
 *           example: Visa, MasterCard supported
 *         is_active:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreatePaymentMethod:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: UPI
 *         description:
 *           type: string
 *           example: Google Pay, PhonePe, Paytm
 *         is_active:
 *           type: boolean
 *           example: true
 *
 *     UpdatePaymentMethod:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Debit Card
 *         description:
 *           type: string
 *           example: Updated description
 *         is_active:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * /api/payment-method/get-all:
 *   get:
 *     summary: Get all payment methods
 *     tags: [Payment Method]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payment methods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentMethod'
 */

/**
 * @swagger
 * /api/payment-method/get-single-method/{id}:
 *   get:
 *     summary: Get single payment method
 *     tags: [Payment Method]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 65a8f12c9b2e4f0012abcd34
 *     responses:
 *       200:
 *         description: Payment method details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       404:
 *         description: Payment method not found
 */

/**
 * @swagger
 * /api/payment-method/create-new-payment-method:
 *   post:
 *     summary: Create new payment method
 *     tags: [Payment Method]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaymentMethod'
 *     responses:
 *       201:
 *         description: Payment method created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       400:
 *         description: Validation error or duplicate payment method
 */

/**
 * @swagger
 * /api/payment-method/update-payment-method/{id}:
 *   patch:
 *     summary: Update payment method
 *     tags: [Payment Method]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePaymentMethod'
 *     responses:
 *       200:
 *         description: Payment method updated successfully
 *       404:
 *         description: Payment method not found
 */

/**
 * @swagger
 * /api/payment-method/delete-payment-method/{id}:
 *   delete:
 *     summary: Delete payment method
 *     tags: [Payment Method]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment method deleted successfully
 *       404:
 *         description: Payment method not found
 */
