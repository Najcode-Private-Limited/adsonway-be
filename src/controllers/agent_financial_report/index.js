const ApiResponse = require('../../utils/api_response');
const { asyncHandler } = require('../../utils/async_handler');
const {
   getAgentFinancialReport,
   getDepositRecordsAgent,
   getApplicationsReportAgent,
   getRefundsReportAgent,
} = require('../../repositories/agent_financial_report');

exports.handleGetAgentFinancialReport = asyncHandler(async (req, res) => {
   const { platform, status, fromDate, toDate } = req.query;
   const agentId = req.agent._id;

   const validPlatforms = ['google', 'facebook', 'all'];
   if (platform && !validPlatforms.includes(platform.toLowerCase())) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Invalid platform. Must be one of: google, facebook, all',
               false
            )
         );
   }

   const validStatuses = ['approved', 'pending', 'rejected', 'all'];
   if (status && !validStatuses.includes(status.toLowerCase())) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Invalid status. Must be one of: approved, pending, rejected, all',
               false
            )
         );
   }

   if (fromDate && isNaN(Date.parse(fromDate))) {
      return res
         .status(400)
         .json(
            new ApiResponse(400, null, 'Invalid fromDate format. Use ISO date format', false)
         );
   }

   if (toDate && isNaN(Date.parse(toDate))) {
      return res
         .status(400)
         .json(
            new ApiResponse(400, null, 'Invalid toDate format. Use ISO date format', false)
         );
   }

   const filters = {
      platform: platform?.toLowerCase() || 'all',
      status: status?.toLowerCase() || 'all',
      fromDate: fromDate ? new Date(fromDate) : null,
      toDate: toDate ? new Date(toDate) : null,
   };

   const financialReport = await getAgentFinancialReport(agentId, filters);

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            financialReport,
            'Agent financial report retrieved successfully',
            true
         )
      );
});

exports.handleExportAgentFinancialReport = asyncHandler(async (req, res) => {
   const { platform, status, fromDate, toDate, type } = req.query;
   const agentId = req.agent._id;

   const validTypes = ['deposits', 'applications', 'refunds', 'all'];
   if (type && !validTypes.includes(type.toLowerCase())) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Invalid type. Must be one of: deposits, applications, refunds, all',
               false
            )
         );
   }

   const filters = {
      platform: platform?.toLowerCase() || 'all',
      status: status?.toLowerCase() || 'all',
      fromDate: fromDate ? new Date(fromDate) : null,
      toDate: toDate ? new Date(toDate) : null,
   };

   const exportType = type?.toLowerCase() || 'all';
   let csvContent = '';

   if (exportType === 'deposits' || exportType === 'all') {
      const depositRecords = await getDepositRecordsAgent(agentId, filters);
      csvContent += 'DEPOSIT RECORDS\n';
      csvContent += 'Deposit ID,Date,User Name,User Email,Ad Account Name,Amount,Fees,Fee %,Total,Status,Platform\n';
      depositRecords.forEach((record) => {
         csvContent += `${record.depositId},${new Date(record.date).toISOString().split('T')[0]},${record.user?.fullName || 'Unknown'},${record.user?.email || 'N/A'},${record.adAccountName},${record.amount},${record.fees},${record.feePercentage}%,${record.total},${record.status},${record.platform}\n`;
      });
      csvContent += '\n';
   }

   if (exportType === 'applications' || exportType === 'all') {
      const applicationsReport = await getApplicationsReportAgent(agentId, filters);
      csvContent += 'APPLICATIONS REPORT\n';
      csvContent += 'Date,User Name,User Email,Service,Account Name,App Fee,Deposit,Deposit Fee,Total,Status\n';
      applicationsReport.forEach((record) => {
         csvContent += `${new Date(record.date).toISOString().split('T')[0]},${record.user?.fullName || 'Unknown'},${record.user?.email || 'N/A'},${record.service},${record.accountName},${record.appFee},${record.deposit},${record.depositFee},${record.total},${record.status}\n`;
      });
      csvContent += '\n';
   }

   if (exportType === 'refunds' || exportType === 'all') {
      const refundsReport = await getRefundsReportAgent(agentId, filters);
      csvContent += 'REFUNDS REPORT\n';
      csvContent += 'Refund ID,Date,User Name,User Email,Platform,Account Name,Requested Amount,Fees Amount,Total Refund Amount,Status\n';
      if (refundsReport.refunds.length > 0) {
         refundsReport.refunds.forEach((record) => {
            csvContent += `${record.refundId},${new Date(record.date).toISOString().split('T')[0]},${record.user?.fullName || 'Unknown'},${record.user?.email || 'N/A'},${record.platform},${record.accountName},${record.requestedAmount},${record.feesAmount},${record.totalRefundAmount},${record.status}\n`;
         });
      } else {
         csvContent += refundsReport.message + '\n';
      }
   }

   const timestamp = new Date().toISOString().split('T')[0];
   res.setHeader('Content-Type', 'text/csv');
   res.setHeader(
      'Content-Disposition',
      `attachment; filename=agent-financial-report-${timestamp}.csv`
   );

   return res.status(200).send(csvContent);
});
