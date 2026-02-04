const ApiResponse = require('../../utils/api_response');
const { asyncHandler } = require('../../utils/async_handler');
const {
   generateMonthlyReport,
   recordPayment,
   getAllAgentsSummary,
   getAgentReports,
} = require('../../repositories/agent_commission');

// Agent: Get my monthly report
exports.getMyMonthlyReport = asyncHandler(async (req, res) => {
   const { month, year } = req.query;
   const agentId = req.agent._id;

   const m = parseInt(month) || new Date().getMonth() + 1;
   const y = parseInt(year) || new Date().getFullYear();

   const report = await generateMonthlyReport(agentId, m, y);

   return res
      .status(200)
      .json(new ApiResponse(200, report, 'Report generated', true));
});

exports.getMyReports = asyncHandler(async (req, res) => {
   const { year } = req.query;
   const agentId = req.agent._id;

   const reports = await getAgentReports(agentId, year ? parseInt(year) : null);

   return res
      .status(200)
      .json(new ApiResponse(200, reports, 'Reports fetched', true));
});

// Admin: Get report for specific agent
exports.getAgentReport = asyncHandler(async (req, res) => {
   const { agentId } = req.params;
   const { month, year } = req.query;

   const m = parseInt(month) || new Date().getMonth() + 1;
   const y = parseInt(year) || new Date().getFullYear();

   const report = await generateMonthlyReport(agentId, m, y);

   return res
      .status(200)
      .json(new ApiResponse(200, report, 'Report generated', true));
});

// Admin: Get all agents summary
exports.getAllAgentsCommission = asyncHandler(async (req, res) => {
   const { year } = req.query;

   const summaries = await getAllAgentsSummary(year ? parseInt(year) : null);

   return res
      .status(200)
      .json(
         new ApiResponse(200, summaries, 'All agents summary fetched', true)
      );
});

exports.payAgentCommission = asyncHandler(async (req, res) => {
   const { agentId } = req.params;
   const { month, year, amount, remarks } = req.body;

   if (!month || !year || !amount || amount <= 0) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Month, year, and valid amount required',
               false
            )
         );
   }

   const result = await recordPayment(
      agentId,
      parseInt(month),
      parseInt(year),
      parseFloat(amount),
      remarks
   );

   if (!result) {
      return res
         .status(404)
         .json(
            new ApiResponse(404, null, 'No report found for this month', false)
         );
   }

   return res
      .status(200)
      .json(new ApiResponse(200, result, 'Payment recorded', true));
});
