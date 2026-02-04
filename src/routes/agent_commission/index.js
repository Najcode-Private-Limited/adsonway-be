const express = require('express');
const { isAdmin, isAgent } = require('../../middlewares/auth');
const {
   getMyMonthlyReport,
   getMyReports,
   getAgentReport,
   getAllAgentsCommission,
   payAgentCommission,
} = require('../../controllers/agent_commission');

const router = express.Router();

router.get('/my-report', isAgent, getMyMonthlyReport);
router.get('/my-reports', isAgent, getMyReports);

router.get('/admin/all', isAdmin, getAllAgentsCommission);
router.get('/admin/agent/:agentId', isAdmin, getAgentReport);
router.post('/admin/agent/:agentId/pay', isAdmin, payAgentCommission);

module.exports = router;
