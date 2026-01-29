const GoogleAdApplication = require('../../models/google_application');
const FacebookApplication = require('../../models/facebook_application');
const RefundApplication = require('../../models/refund_application');
const WalletTopupRequest = require('../../models/wallet_topup_request');
const RequestTopupGoogleId = require('../../models/request_topoup_google_id');
const RequestTopupFacebookId = require('../../models/request_topup_facebook_id');
const User = require('../../models/user');

const buildDateFilter = (fromDate, toDate) => {
   const dateFilter = {};
   if (fromDate) {
      dateFilter.$gte = new Date(fromDate);
   }
   if (toDate) {
      dateFilter.$lte = new Date(toDate);
   }
   return Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : {};
};

// Get all user IDs associated with the agent (users created by this agent)
const getAgentUserIds = async (agentId) => {
   const users = await User.find({ createdBy: agentId, role: 'user' }).select('_id');
   return users.map(user => user._id);
};

exports.getApprovedApplicationsCountAgent = async (agentId, filters = {}) => {
   const { platform, status, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);

   const userIds = await getAgentUserIds(agentId);
   if (userIds.length === 0) return 0;

   let googleCount = 0;
   let facebookCount = 0;

   const statusFilter = status && status !== 'all' ? { status } : { status: 'approved' };
   const userFilter = { user: { $in: userIds } };

   if (!platform || platform === 'all' || platform === 'google') {
      googleCount = await GoogleAdApplication.countDocuments({
         ...userFilter,
         ...statusFilter,
         ...dateFilter,
      });
   }

   if (!platform || platform === 'all' || platform === 'facebook') {
      facebookCount = await FacebookApplication.countDocuments({
         ...userFilter,
         ...statusFilter,
         ...dateFilter,
      });
   }

   return googleCount + facebookCount;
};

exports.getWalletTopupsTotalAgent = async (agentId, filters = {}) => {
   const { status, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);

   const userIds = await getAgentUserIds(agentId);
   if (userIds.length === 0) return 0;

   const statusFilter = status && status !== 'all' ? { status } : { status: 'approved' };
   const userFilter = { userId: { $in: userIds } };

   const result = await WalletTopupRequest.aggregate([
      {
         $match: {
            ...userFilter,
            ...statusFilter,
            ...dateFilter,
         },
      },
      {
         $group: {
            _id: null,
            total: { $sum: '$amount' },
         },
      },
   ]);

   return result.length > 0 ? result[0].total : 0;
};

exports.getTotalDepositsAgent = async (agentId, filters = {}) => {
   const { platform, status, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);

   const userIds = await getAgentUserIds(agentId);
   if (userIds.length === 0) return 0;

   let googleTotal = 0;
   let facebookTotal = 0;

   const statusFilter = status && status !== 'all' ? { status } : { status: 'approved' };
   const userFilter = { userId: { $in: userIds } };
   const appUserFilter = { user: { $in: userIds } };

   if (!platform || platform === 'all' || platform === 'google') {
      const googleResult = await RequestTopupGoogleId.aggregate([
         {
            $match: {
               ...userFilter,
               ...statusFilter,
               ...dateFilter,
            },
         },
         {
            $group: {
               _id: null,
               total: { $sum: '$amount' },
            },
         },
      ]);
      googleTotal += googleResult.length > 0 ? googleResult[0].total : 0;

      const googleAppResult = await GoogleAdApplication.aggregate([
         {
            $match: {
               ...appUserFilter,
               ...statusFilter,
               ...dateFilter,
            },
         },
         {
            $unwind: '$adAccounts',
         },
         {
            $group: {
               _id: null,
               total: { $sum: '$adAccounts.amount' },
            },
         },
      ]);
      googleTotal += googleAppResult.length > 0 ? googleAppResult[0].total : 0;
   }

   if (!platform || platform === 'all' || platform === 'facebook') {
      const facebookResult = await RequestTopupFacebookId.aggregate([
         {
            $match: {
               ...userFilter,
               ...statusFilter,
               ...dateFilter,
            },
         },
         {
            $group: {
               _id: null,
               total: { $sum: '$amount' },
            },
         },
      ]);
      facebookTotal += facebookResult.length > 0 ? facebookResult[0].total : 0;

      const facebookAppResult = await FacebookApplication.aggregate([
         {
            $match: {
               ...appUserFilter,
               ...statusFilter,
               ...dateFilter,
            },
         },
         {
            $unwind: '$adAccounts',
         },
         {
            $group: {
               _id: null,
               total: { $sum: '$adAccounts.amount' },
            },
         },
      ]);
      facebookTotal += facebookAppResult.length > 0 ? facebookAppResult[0].total : 0;
   }

   return googleTotal + facebookTotal;
};

exports.getTotalRefundsAgent = async (agentId, filters = {}) => {
   const { platform, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);

   const userIds = await getAgentUserIds(agentId);
   if (userIds.length === 0) return 0;

   const matchConditions = {
      status: 'approved',
      user: { $in: userIds },
      ...dateFilter,
   };

   if (platform && platform !== 'all') {
      matchConditions.platform = platform;
   }

   const result = await RefundApplication.aggregate([
      {
         $match: matchConditions,
      },
      {
         $group: {
            _id: null,
            total: { $sum: '$total_refund_amount' },
         },
      },
   ]);

   return result.length > 0 ? result[0].total : 0;
};

exports.getDepositRecordsAgent = async (agentId, filters = {}) => {
   const { platform, status, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);

   const userIds = await getAgentUserIds(agentId);
   if (userIds.length === 0) return [];

   const deposits = [];

   const statusFilter = status && status !== 'all' ? { status } : {};
   const userFilter = { userId: { $in: userIds } };

   if (!platform || platform === 'all' || platform === 'google') {
      const googleTopups = await RequestTopupGoogleId.find({
         ...userFilter,
         ...statusFilter,
         ...dateFilter,
      })
         .populate('accountId', 'account_name deposit_fee')
         .populate('userId', 'full_name email username')
         .sort({ createdAt: -1 });

      googleTopups.forEach((topup) => {
         const feePercentage = topup.accountId?.deposit_fee || 0;
         const fees = (topup.amount * feePercentage) / 100;
         deposits.push({
            depositId: topup._id,
            date: topup.createdAt,
            adAccountName: topup.accountId?.account_name || 'Unknown Account',
            amount: topup.amount,
            fees: fees,
            feePercentage: feePercentage,
            total: topup.amount + fees,
            status: topup.status,
            platform: 'google',
            user: {
               _id: topup.userId?._id,
               fullName: topup.userId?.full_name || 'Unknown User',
               email: topup.userId?.email,
               username: topup.userId?.username,
            },
         });
      });
   }

   if (!platform || platform === 'all' || platform === 'facebook') {
      const facebookTopups = await RequestTopupFacebookId.find({
         ...userFilter,
         ...statusFilter,
         ...dateFilter,
      })
         .populate('accountId', 'account_name deposit_fee')
         .populate('userId', 'full_name email username')
         .sort({ createdAt: -1 });

      facebookTopups.forEach((topup) => {
         const feePercentage = topup.accountId?.deposit_fee || 0;
         const fees = (topup.amount * feePercentage) / 100;
         deposits.push({
            depositId: topup._id,
            date: topup.createdAt,
            adAccountName: topup.accountId?.account_name || 'Unknown Account',
            amount: topup.amount,
            fees: fees,
            feePercentage: feePercentage,
            total: topup.amount + fees,
            status: topup.status,
            platform: 'facebook',
            user: {
               _id: topup.userId?._id,
               fullName: topup.userId?.full_name || 'Unknown User',
               email: topup.userId?.email,
               username: topup.userId?.username,
            },
         });
      });
   }

   deposits.sort((a, b) => new Date(b.date) - new Date(a.date));

   return deposits;
};

exports.getApplicationsReportAgent = async (agentId, filters = {}) => {
   const { platform, status, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);

   const userIds = await getAgentUserIds(agentId);
   if (userIds.length === 0) return [];

   const applications = [];

   const statusFilter = status && status !== 'all' ? { status } : {};
   const userFilter = { user: { $in: userIds } };

   if (!platform || platform === 'all' || platform === 'google') {
      const googleApps = await GoogleAdApplication.find({
         ...userFilter,
         ...statusFilter,
         ...dateFilter,
      })
         .populate('user', 'full_name email username')
         .sort({ createdAt: -1 });

      googleApps.forEach((app) => {
         app.adAccounts.forEach((account) => {
            const appFee = app.submissionFee || 20;
            const deposit = account.amount;
            const depositFeePercentage = 5;
            const depositFee = (deposit * depositFeePercentage) / 100;
            const total = appFee + deposit + depositFee;

            applications.push({
               date: app.createdAt,
               service: 'Google',
               accountName: account.accountName,
               appFee: appFee,
               deposit: deposit,
               depositFee: depositFee,
               total: total,
               status: app.status,
               platform: 'google',
               user: {
                  _id: app.user?._id,
                  fullName: app.user?.full_name || 'Unknown User',
                  email: app.user?.email,
                  username: app.user?.username,
               },
            });
         });
      });
   }

   if (!platform || platform === 'all' || platform === 'facebook') {
      const facebookApps = await FacebookApplication.find({
         ...userFilter,
         ...statusFilter,
         ...dateFilter,
      })
         .populate('user', 'full_name email username')
         .sort({ createdAt: -1 });

      facebookApps.forEach((app) => {
         app.adAccounts.forEach((account) => {
            const appFee = app.submissionFee || 20;
            const deposit = account.amount;
            const depositFeePercentage = 3;
            const depositFee = (deposit * depositFeePercentage) / 100;
            const total = appFee + deposit + depositFee;

            applications.push({
               date: app.createdAt,
               service: 'Facebook',
               accountName: account.accountName,
               appFee: appFee,
               deposit: deposit,
               depositFee: depositFee,
               total: total,
               status: app.status,
               platform: 'facebook',
               user: {
                  _id: app.user?._id,
                  fullName: app.user?.full_name || 'Unknown User',
                  email: app.user?.email,
                  username: app.user?.username,
               },
            });
         });
      });
   }
   applications.sort((a, b) => new Date(b.date) - new Date(a.date));

   return applications;
};

exports.getRefundsReportAgent = async (agentId, filters = {}) => {
   const { platform, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);

   const userIds = await getAgentUserIds(agentId);
   if (userIds.length === 0) {
      return {
         refunds: [],
         message: 'No associated users found',
      };
   }

   const matchConditions = {
      status: 'approved',
      user: { $in: userIds },
      ...dateFilter,
   };

   if (platform && platform !== 'all') {
      matchConditions.platform = platform;
   }

   const refunds = await RefundApplication.find(matchConditions)
      .populate('user', 'full_name email username')
      .sort({ createdAt: -1 });

   const refundsData = refunds.map((refund) => ({
      refundId: refund._id,
      date: refund.createdAt,
      platform: refund.platform,
      accountName: refund.account_name,
      requestedAmount: refund.requested_amount,
      feesAmount: refund.fees_amount,
      totalRefundAmount: refund.total_refund_amount,
      status: refund.status,
      user: {
         _id: refund.user?._id,
         fullName: refund.user?.full_name || 'Unknown User',
         email: refund.user?.email,
         username: refund.user?.username,
      },
   }));

   if (refundsData.length === 0) {
      return {
         refunds: [],
         message: 'No refunds found for the selected period',
      };
   }

   return {
      refunds: refundsData,
      message: null,
   };
};

exports.getAgentFinancialReport = async (agentId, filters = {}) => {
   const [
      approvedApplicationsCount,
      walletTopupsTotal,
      totalDeposits,
      totalRefunds,
      depositRecords,
      applicationsReport,
      refundsReport,
   ] = await Promise.all([
      exports.getApprovedApplicationsCountAgent(agentId, filters),
      exports.getWalletTopupsTotalAgent(agentId, filters),
      exports.getTotalDepositsAgent(agentId, filters),
      exports.getTotalRefundsAgent(agentId, filters),
      exports.getDepositRecordsAgent(agentId, filters),
      exports.getApplicationsReportAgent(agentId, filters),
      exports.getRefundsReportAgent(agentId, filters),
   ]);

   return {
      summary: {
         approvedApplicationsCount,
         walletTopupsTotal,
         totalDeposits,
         totalRefunds,
      },
      depositRecords,
      applicationsReport,
      refundsReport,
   };
};
