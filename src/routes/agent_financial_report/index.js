const express = require('express');
const { isAgent } = require('../../middlewares/auth');
const {
   handleGetAgentFinancialReport,
   handleExportAgentFinancialReport,
} = require('../../controllers/agent_financial_report');

const router = express.Router();

router.route('/').get(isAgent, handleGetAgentFinancialReport);
router.route('/export').get(isAgent, handleExportAgentFinancialReport);

module.exports = router;
