const mongoose = require('mongoose');

const agentCommissionLedgerSchema = new mongoose.Schema(
   {
      agent: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      month: { type: Number, required: true },
      year: { type: Number, required: true },
      totalDeposits: { type: Number, default: 0 },
      totalRefunds: { type: Number, default: 0 },
      applicationFees: { type: Number, default: 0 },
      calculatedCommission: { type: Number, default: 0 },
      paidAmount: { type: Number, default: 0 },
      pendingAmount: { type: Number, default: 0 },
      payments: [
         {
            amount: Number,
            paidAt: { type: Date, default: Date.now },
            remarks: String,
         },
      ],
   },
   { timestamps: true }
);

agentCommissionLedgerSchema.index(
   { agent: 1, month: 1, year: 1 },
   { unique: true }
);

module.exports = mongoose.model(
   'AgentCommissionLedger',
   agentCommissionLedgerSchema
);
