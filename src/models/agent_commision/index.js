const mongoose = require('mongoose');

const agentCommissionSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      commision_percent: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true }
);

const AgentCommission = mongoose.model(
   'AgentCommission',
   agentCommissionSchema
);

module.exports = AgentCommission;
