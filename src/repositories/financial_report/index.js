const GoogleAdApplication = require('../../models/google_application');
const FacebookApplication = require('../../models/facebook_application');
const RefundApplication = require('../../models/refund_application');
const WalletTopupRequest = require('../../models/wallet_topup_request');
const RequestTopupGoogleId = require('../../models/request_topoup_google_id');
const RequestTopupFacebookId = require('../../models/request_topup_facebook_id');

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

exports.getApprovedApplicationsCount = async (userId, filters = {}) => {
   const { platform, status, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);
   
   let googleCount = 0;
   let facebookCount = 0;
   
   const statusFilter = status && status !== 'all' ? { status } : { status: 'approved' };
   
   if (!platform || platform === 'all' || platform === 'google') {
      googleCount = await GoogleAdApplication.countDocuments({
         user: userId,
         ...statusFilter,
         ...dateFilter,
      });
   }
   
   if (!platform || platform === 'all' || platform === 'facebook') {
      facebookCount = await FacebookApplication.countDocuments({
         user: userId,
         ...statusFilter,
         ...dateFilter,
      });
   }
   
   return googleCount + facebookCount;
};

exports.getWalletTopupsTotal = async (userId, filters = {}) => {
   const { status, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);
   
   const statusFilter = status && status !== 'all' ? { status } : { status: 'approved' };
   
   const result = await WalletTopupRequest.aggregate([
      {
         $match: {
            userId: userId,
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

exports.getTotalDeposits = async (userId, filters = {}) => {
   const { platform, status, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);
   
   let googleTotal = 0;
   let facebookTotal = 0;
   
   const statusFilter = status && status !== 'all' ? { status } : { status: 'approved' };
   
   if (!platform || platform === 'all' || platform === 'google') {
      const googleResult = await RequestTopupGoogleId.aggregate([
         {
            $match: {
               userId: userId,
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
               user: userId,
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
               userId: userId,
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
               user: userId,
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

exports.getTotalRefunds = async (userId, filters = {}) => {
   const { platform, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);
   
   const matchConditions = {
      user: userId,
      status: 'approved',
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

exports.getDepositRecords = async (userId, filters = {}) => {
   const { platform, status, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);
   
   const deposits = [];
   
   const statusFilter = status && status !== 'all' ? { status } : {};
   
   if (!platform || platform === 'all' || platform === 'google') {
      const googleTopups = await RequestTopupGoogleId.find({
         userId: userId,
         ...statusFilter,
         ...dateFilter,
      })
         .populate('accountId', 'account_name deposit_fee')
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
         });
      });
   }
   
   if (!platform || platform === 'all' || platform === 'facebook') {
      const facebookTopups = await RequestTopupFacebookId.find({
         userId: userId,
         ...statusFilter,
         ...dateFilter,
      })
         .populate('accountId', 'account_name deposit_fee')
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
         });
      });
   }
   
   deposits.sort((a, b) => new Date(b.date) - new Date(a.date));
   
   return deposits;
};

exports.getApplicationsReport = async (userId, filters = {}) => {
   const { platform, status, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);
   
   const applications = [];
   
   const statusFilter = status && status !== 'all' ? { status } : {};
   
   if (!platform || platform === 'all' || platform === 'google') {
      const googleApps = await GoogleAdApplication.find({
         user: userId,
         ...statusFilter,
         ...dateFilter,
      }).sort({ createdAt: -1 });
      
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
            });
         });
      });
   }
   
   if (!platform || platform === 'all' || platform === 'facebook') {
      const facebookApps = await FacebookApplication.find({
         user: userId,
         ...statusFilter,
         ...dateFilter,
      }).sort({ createdAt: -1 });
      
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
            });
         });
      });
   }
   applications.sort((a, b) => new Date(b.date) - new Date(a.date));
   
   return applications;
};

exports.getRefundsReport = async (userId, filters = {}) => {
   const { platform, fromDate, toDate } = filters;
   const dateFilter = buildDateFilter(fromDate, toDate);
   
   const matchConditions = {
      user: userId,
      status: 'approved',
      ...dateFilter,
   };
   
   if (platform && platform !== 'all') {
      matchConditions.platform = platform;
   }
   
   const refunds = await RefundApplication.find(matchConditions).sort({
      createdAt: -1,
   });
   
   const refundsData = refunds.map((refund) => ({
      refundId: refund._id,
      date: refund.createdAt,
      platform: refund.platform,
      accountName: refund.account_name,
      requestedAmount: refund.requested_amount,
      feesAmount: refund.fees_amount,
      totalRefundAmount: refund.total_refund_amount,
      status: refund.status,
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

exports.getUserFinancialReport = async (userId, filters = {}) => {
   const [
      approvedApplicationsCount,
      walletTopupsTotal,
      totalDeposits,
      totalRefunds,
      depositRecords,
      applicationsReport,
      refundsReport,
   ] = await Promise.all([
      exports.getApprovedApplicationsCount(userId, filters),
      exports.getWalletTopupsTotal(userId, filters),
      exports.getTotalDeposits(userId, filters),
      exports.getTotalRefunds(userId, filters),
      exports.getDepositRecords(userId, filters),
      exports.getApplicationsReport(userId, filters),
      exports.getRefundsReport(userId, filters),
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
