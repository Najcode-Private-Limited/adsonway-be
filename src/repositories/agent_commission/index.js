const AgentCommissionLedger = require('../../models/agent_commission_ledger');
const AgentCommission = require('../../models/agent_commision');
const User = require('../../models/user');
const Config = require('../../models/config');
const RequestTopupGoogleId = require('../../models/request_topoup_google_id');
const RequestTopupFacebookId = require('../../models/request_topup_facebook_id');
const RefundApplication = require('../../models/refund_application');
const GoogleApplication = require('../../models/google_application');
const FacebookApplication = require('../../models/facebook_application');
const PaymentFeeRules = require('../../models/payment_fee_rules');

const getMonthRange = (month, year) => {
   const start = new Date(year, month - 1, 1);
   const end = new Date(year, month, 0, 23, 59, 59, 999);
   return { start, end };
};

const calculateAgentMonthlyCommission = async (agentId, month, year) => {
   const { start, end } = getMonthRange(month, year);

   const users = await User.find({ createdBy: agentId, role: 'user' }).select(
      '_id'
   );
   const userIds = users.map((u) => u._id);

   if (userIds.length === 0) {
      return {
         totalDeposits: 0,
         totalRefunds: 0,
         applicationFees: 0,
         calculatedCommission: 0,
      };
   }

   const config = await Config.findOne();
   const platformFee = config?.platform_fee || 1;

   const agentCommissionDoc = await AgentCommission.findOne({ user: agentId });
   const agentCommissionPercent = agentCommissionDoc?.commision_percent || 50;

   let totalDeposits = 0;
   let totalRefunds = 0;
   let totalApplicationFees = 0;
   let calculatedCommission = 0;

   const platformPercentage = platformFee / 100;
   const agentCommissionPercentage = agentCommissionPercent / 100;

   for (const userId of userIds) {
      const paymentFeeRule = await PaymentFeeRules.findOne({
         userId: userId,
         is_active: true,
      });

      const facebookCommission = paymentFeeRule?.facebook_commission || 30;
      const googleCommission = paymentFeeRule?.google_commission || 30;

      const [googleTopups, facebookTopups, googleApps, facebookApps] =
         await Promise.all([
            RequestTopupGoogleId.aggregate([
               {
                  $match: {
                     userId: userId,
                     status: 'approved',
                     createdAt: { $gte: start, $lte: end },
                  },
               },
               { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            RequestTopupFacebookId.aggregate([
               {
                  $match: {
                     userId: userId,
                     status: 'approved',
                     createdAt: { $gte: start, $lte: end },
                  },
               },
               { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            GoogleApplication.aggregate([
               {
                  $match: {
                     user: userId,
                     status: 'approved',
                     createdAt: { $gte: start, $lte: end },
                  },
               },
               { $unwind: '$adAccounts' },
               {
                  $group: {
                     _id: null,
                     total: { $sum: '$adAccounts.amount' },
                     fees: { $sum: '$submissionFee' },
                  },
               },
            ]),
            FacebookApplication.aggregate([
               {
                  $match: {
                     user: userId,
                     status: 'approved',
                     createdAt: { $gte: start, $lte: end },
                  },
               },
               { $unwind: '$adAccounts' },
               {
                  $group: {
                     _id: null,
                     total: { $sum: '$adAccounts.amount' },
                     fees: { $sum: '$submissionFee' },
                  },
               },
            ]),
         ]);

      const refunds = await RefundApplication.aggregate([
         {
            $match: {
               user: userId,
               status: 'approved',
               createdAt: { $gte: start, $lte: end },
            },
         },
         { $group: { _id: null, total: { $sum: '$total_refund_amount' } } },
      ]);

      const userGoogleDeposits =
         (googleTopups[0]?.total || 0) + (googleApps[0]?.total || 0);
      const userFacebookDeposits =
         (facebookTopups[0]?.total || 0) + (facebookApps[0]?.total || 0);
      const userRefunds = refunds[0]?.total || 0;
      const userApplicationFees =
         (googleApps[0]?.fees || 0) + (facebookApps[0]?.fees || 0);

      const googleNetAmount =
         userGoogleDeposits -
         userRefunds *
            (userGoogleDeposits /
               (userGoogleDeposits + userFacebookDeposits + 0.01));
      const facebookNetAmount =
         userFacebookDeposits -
         userRefunds *
            (userFacebookDeposits /
               (userGoogleDeposits + userFacebookDeposits + 0.01));

      // Calculate commission using user's specific payment rules
      const googleCommissionAmount =
         (googleNetAmount * (googleCommission / 100) -
            googleNetAmount * platformPercentage) *
         agentCommissionPercentage;
      const facebookCommissionAmount =
         (facebookNetAmount * (facebookCommission / 100) -
            facebookNetAmount * platformPercentage) *
         agentCommissionPercentage;
      const applicationFeeCommission =
         userApplicationFees * agentCommissionPercentage;

      const userTotalCommission =
         googleCommissionAmount +
         facebookCommissionAmount +
         applicationFeeCommission;

      // Accumulate totals
      totalDeposits += userGoogleDeposits + userFacebookDeposits;
      totalRefunds += userRefunds;
      totalApplicationFees += userApplicationFees;
      calculatedCommission += userTotalCommission;
   }

   return {
      totalDeposits,
      totalRefunds,
      applicationFees: totalApplicationFees,
      calculatedCommission,
   };
};

exports.generateMonthlyReport = async (agentId, month, year) => {
   const currentYear = new Date().getFullYear();
   const currentMonth = new Date().getMonth() + 1;

   if (year > currentYear || (year === currentYear && month > currentMonth)) {
      return null;
   }

   const data = await calculateAgentMonthlyCommission(agentId, month, year);

   const existing = await AgentCommissionLedger.findOne({
      agent: agentId,
      month,
      year,
   });
   const paidAmount = existing?.paidAmount || 0;
   const payments = existing?.payments || [];

   const ledger = await AgentCommissionLedger.findOneAndUpdate(
      { agent: agentId, month, year },
      {
         ...data,
         paidAmount,
         pendingAmount: Math.max(0, data.calculatedCommission - paidAmount),
         payments,
      },
      { upsert: true, new: true }
   );

   return ledger;
};

exports.getAgentReports = async (agentId, year) => {
   const query = { agent: agentId };
   if (year) query.year = year;

   return AgentCommissionLedger.find(query)
      .populate('agent', 'full_name email')
      .sort({ year: -1, month: -1 });
};

exports.recordPayment = async (agentId, month, year, amount, remarks = '') => {
   const ledger = await AgentCommissionLedger.findOne({
      agent: agentId,
      month,
      year,
   });
   if (!ledger) return null;

   ledger.paidAmount += amount;
   ledger.pendingAmount = Math.max(
      0,
      ledger.calculatedCommission - ledger.paidAmount
   );
   ledger.payments.push({ amount, remarks, paidAt: new Date() });

   await ledger.save();
   return ledger;
};

exports.getAllAgentsSummary = async (year = new Date().getFullYear()) => {
   const agents = await User.find({ role: 'agent' })
      .select('full_name email')
      .lean();

   const currentYear = new Date().getFullYear();
   const currentMonth = new Date().getMonth() + 1;

   const summaries = await Promise.all(
      agents.map(async (agent) => {
         const maxMonth = year < currentYear ? 12 : Math.min(12, currentMonth);
         await Promise.all(
            Array.from({ length: maxMonth }, (_, i) =>
               exports.generateMonthlyReport(agent._id, i + 1, year)
            )
         );

         const reports = await exports.getAgentReports(agent._id, year);

         const totals = reports.reduce(
            (acc, r) => {
               acc.totalCommission += r.calculatedCommission || 0;
               acc.totalPaid += r.paidAmount || 0;
               acc.totalPending += r.pendingAmount || 0;
               return acc;
            },
            { totalCommission: 0, totalPaid: 0, totalPending: 0 }
         );

         return {
            agent: {
               _id: agent._id,
               name: agent.full_name,
               email: agent.email,
            },
            ...totals,
            reports,
         };
      })
   );

   return summaries;
};

exports.getAllMySummary = async (agentId, year) => {
   const currentYear = new Date().getFullYear();
   const currentMonth = new Date().getMonth() + 1;

   const maxMonth = year < currentYear ? 12 : Math.min(12, currentMonth);
   await Promise.all(
      Array.from({ length: maxMonth }, (_, i) =>
         exports.generateMonthlyReport(agentId, i + 1, year)
      )
   );
   const reports = await exports.getAgentReports(agentId, year);
   return reports;
};
