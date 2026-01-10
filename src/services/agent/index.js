const { hashPassword } = require('../../functions');
const {
   createPaymentFeeRule,
} = require('../../repositories/payment_fee_rules');
const {
   checkExiststingInstance,
   createUser,
   getUsersCreatedByAgent,
} = require('../../repositories/user');

exports.createUserService = async (agentData, agentId) => {
   const checkIfUserExists = await checkExiststingInstance(
      agentData.username,
      agentData.email
   );

   if (checkIfUserExists) {
      return {
         statusCode: 400,
         success: false,
         message: 'User already exists in the system',
         data: null,
      };
   }

   const payload = {
      full_name: agentData.full_name,
      email: agentData.email,
      username: agentData.username,
      role: 'user',
   };

   const hashedPassword = await hashPassword(agentData.password);
   payload.password = hashedPassword;
   payload.createdBy = agentId || null;

   const newUser = await createUser(payload);

   if (!newUser) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to create user',
         data: null,
      };
   }

   const userData = newUser.toObject();
   delete userData.password;

   const paymentRulePayload = {
      userId: newUser._id,
      facebook_commission: agentData.facebook_commission,
      google_commission: agentData.google_commission,
      snapchat_commission: agentData.snapchat_commission,
      tiktok_commission: agentData.tiktok_commission,
      facebook_application_fee: agentData.facebook_application_fee,
      google_application_fee: agentData.google_application_fee,
      snapchat_application_fee: agentData.snapchat_application_fee,
      tiktok_application_fee: agentData.tiktok_application_fee,
   };

   const newPaymentRuleForUser = await createPaymentFeeRule(paymentRulePayload);
   if (!newPaymentRuleForUser) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to create payment fee rule for user',
         data: null,
      };
   }

   return {
      statusCode: 201,
      success: true,
      message: 'User created successfully',
      data: {
         user: userData,
         paymentFeeRule: newPaymentRuleForUser,
      },
   };
};

exports.getAllUsersForSpecificAgentService = async (agentId) => {
   const users = await getUsersCreatedByAgent(agentId);
   if (!users) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve users for the specified agent',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Users retrieved successfully for the specified agent',
      data: users,
   };
};

exports.updateAgentProfileService = async (agentId, updateData) => {
   const checkAgentExistance = await getUserById(agentId);

   if (!checkAgentExistance) {
      return {
         statusCode: 404,
         success: false,
         message: 'Agent not found',
         data: null,
      };
   }

   const payload = {};
   if (updateData.full_name) payload.full_name = updateData.full_name;
   if (updateData.username) payload.username = updateData.username;
   if (updateData.password) {
      if (comparePassword(updateData.password, checkAgentExistance.password)) {
         return {
            statusCode: 400,
            success: false,
            message: 'New password cannot be the same as the old password',
            data: null,
         };
      }
      const hashedPassword = await hashPassword(updateData.password);
      payload.password = hashedPassword;
   }
   if (updateData.display_picture)
      payload.display_picture = updateData.display_picture;
   if (updateData.phone_number) payload.phone_number = updateData.phone_number;
   if (updateData.organization) payload.organization = updateData.organization;
   const updatedAgent = await updateUser(agentId, payload);

   if (!updatedAgent) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to update agent profile',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Agent profile updated successfully',
      data: updatedAgent,
   };
};
