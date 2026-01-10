const { hashPassword } = require('../../functions');
const {
   createPaymentFeeRule,
} = require('../../repositories/payment_fee_rules');
const {
   checkExiststingInstance,
   createUser,
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
