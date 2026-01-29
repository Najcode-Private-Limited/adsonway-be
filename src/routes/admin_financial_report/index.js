const express = require('express');
const { isAdmin } = require('../../middlewares/auth');
const {
   handleGetAdminFinancialReport,
   handleExportAdminFinancialReport,
   handleGetAllUsersForFinancialReport,
} = require('../../controllers/admin_financial_report');

const router = express.Router();

router.route('/').get(isAdmin, handleGetAdminFinancialReport);
router.route('/export').get(isAdmin, handleExportAdminFinancialReport);

module.exports = router;
