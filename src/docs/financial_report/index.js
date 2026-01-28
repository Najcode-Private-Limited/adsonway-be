/**
 * @swagger
 * tags:
 *   name: Financial Reports
 *   description: User financial reports and analytics
 */

/**
 * @swagger
 * /api/user/financial-reports:
 *   get:
 *     summary: Get complete financial report for authenticated user
 *     description: |
 *       Returns a comprehensive financial report including:
 *       - Summary metrics (approved applications count, wallet top-ups total, total deposits, total refunds)
 *       - Deposit records table
 *       - Applications report
 *       - Refunds report (approved only)
 *     tags: [Financial Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: platform
 *         schema:
 *           type: string
 *           enum: [google, facebook, all]
 *           default: all
 *         description: Filter by platform
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [approved, pending, rejected, all]
 *           default: all
 *         description: Filter by status
 *
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (ISO format, e.g., 2026-01-01)
 *         example: "2026-01-01"
 *
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (ISO format, e.g., 2026-01-31)
 *         example: "2026-01-31"
 *
 *     responses:
 *       200:
 *         description: Financial report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinancialReportResponse'
 *       400:
 *         description: Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing JWT token
 *       403:
 *         description: Forbidden - User role required
 */

/**
 * @swagger
 * /api/user/financial-reports/export:
 *   get:
 *     summary: Export financial report as CSV
 *     description: Downloads a CSV file containing the financial report data
 *     tags: [Financial Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: platform
 *         schema:
 *           type: string
 *           enum: [google, facebook, all]
 *           default: all
 *         description: Filter by platform
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [approved, pending, rejected, all]
 *           default: all
 *         description: Filter by status
 *
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (ISO format)
 *         example: "2026-01-01"
 *
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (ISO format)
 *         example: "2026-01-31"
 *
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [deposits, applications, refunds, all]
 *           default: all
 *         description: Type of report to export
 *
 *     responses:
 *       200:
 *         description: CSV file download
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             schema:
 *               type: string
 *             description: Attachment filename
 *             example: attachment; filename=financial-report-2026-01-27.csv
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Unauthorized - Invalid or missing JWT token
 *       403:
 *         description: Forbidden - User role required
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FinancialReportResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         data:
 *           $ref: '#/components/schemas/FinancialReportData'
 *         message:
 *           type: string
 *           example: Financial report retrieved successfully
 *         success:
 *           type: boolean
 *           example: true
 *
 *     FinancialReportData:
 *       type: object
 *       properties:
 *         summary:
 *           $ref: '#/components/schemas/FinancialSummary'
 *         depositRecords:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DepositRecord'
 *         applicationsReport:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ApplicationRecord'
 *         refundsReport:
 *           $ref: '#/components/schemas/RefundsReport'
 *
 *     FinancialSummary:
 *       type: object
 *       properties:
 *         approvedApplicationsCount:
 *           type: integer
 *           description: Total count of approved applications (Google + Facebook)
 *           example: 2
 *         walletTopupsTotal:
 *           type: number
 *           description: Total amount of approved wallet top-ups
 *           example: 0
 *         totalDeposits:
 *           type: number
 *           description: Total deposits from ad accounts and applications
 *           example: 308.00
 *         totalRefunds:
 *           type: number
 *           description: Total amount of approved refunds
 *           example: 0
 *
 *     DepositRecord:
 *       type: object
 *       properties:
 *         depositId:
 *           type: string
 *           description: Unique deposit identifier
 *           example: DEP-742783-PSLAO
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the deposit
 *           example: "2026-01-19T10:30:00.000Z"
 *         adAccountName:
 *           type: string
 *           description: Name of the ad account
 *           example: g test 2
 *         amount:
 *           type: number
 *           description: Deposit amount
 *           example: 100.00
 *         fees:
 *           type: number
 *           description: Fee amount calculated
 *           example: 5.00
 *         feePercentage:
 *           type: number
 *           description: Fee percentage applied
 *           example: 5
 *         total:
 *           type: number
 *           description: Total amount (amount + fees)
 *           example: 105.00
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           example: approved
 *         platform:
 *           type: string
 *           enum: [google, facebook]
 *           example: google
 *
 *     ApplicationRecord:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the application
 *           example: "2026-01-16T08:00:00.000Z"
 *         service:
 *           type: string
 *           enum: [Google, Facebook]
 *           description: Platform/service type
 *           example: Google
 *         accountName:
 *           type: string
 *           description: Name of the ad account
 *           example: testingon meet
 *         appFee:
 *           type: number
 *           description: Application/submission fee
 *           example: 20.00
 *         deposit:
 *           type: number
 *           description: Deposit amount for the account
 *           example: 100.00
 *         depositFee:
 *           type: number
 *           description: Deposit fee calculated
 *           example: 3.00
 *         total:
 *           type: number
 *           description: Total amount (appFee + deposit + depositFee)
 *           example: 123.00
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           example: approved
 *         platform:
 *           type: string
 *           enum: [google, facebook]
 *           example: google
 *
 *     RefundsReport:
 *       type: object
 *       properties:
 *         refunds:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RefundRecord'
 *         message:
 *           type: string
 *           nullable: true
 *           description: Message when no refunds are found
 *           example: No refunds found for the selected period
 *
 *     RefundRecord:
 *       type: object
 *       properties:
 *         refundId:
 *           type: string
 *           description: Unique refund identifier
 *           example: REF-593859-7W8QP
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the refund
 *           example: "2026-01-15T14:00:00.000Z"
 *         platform:
 *           type: string
 *           enum: [google, facebook]
 *           description: Platform for the refund
 *           example: google
 *         accountName:
 *           type: string
 *           description: Name of the account
 *           example: Test Account
 *         requestedAmount:
 *           type: number
 *           description: Amount requested for refund
 *           example: 100.00
 *         feesAmount:
 *           type: number
 *           description: Fees deducted from refund
 *           example: 5.00
 *         totalRefundAmount:
 *           type: number
 *           description: Final refund amount after fees
 *           example: 95.00
 *         status:
 *           type: string
 *           enum: [approved]
 *           description: Status (only approved refunds are shown)
 *           example: approved
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 400
 *         data:
 *           type: object
 *           nullable: true
 *           example: null
 *         message:
 *           type: string
 *           example: "Invalid platform. Must be one of google, facebook, all"
 *         success:
 *           type: boolean
 *           example: false
 */
