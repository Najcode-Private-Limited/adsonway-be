const express = require('express');
const { isUser } = require('../../middlewares/auth');
const {
   handleGetUserFinancialReport,
   handleExportUserFinancialReport,
} = require('../../controllers/financial_report');

const router = express.Router();

router.route('/').get(isUser, handleGetUserFinancialReport);
router.route('/export').get(isUser, handleExportUserFinancialReport);

module.exports = router;
