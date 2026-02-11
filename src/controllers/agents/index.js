const {
   createUserService,
   getAllUsersForSpecificAgentService,
   updateAgentProfileService,
} = require('../../services/agent');
const ApiResponse = require('../../utils/api_response/index');
const { asyncHandler } = require('../../utils/async_handler/index');

exports.handleCreatUser = asyncHandler(async (req, res) => {
   const {
      email,
      username,
      password,
      full_name,
      role = 'user',
      facebook_commission,
      google_commission,
      facebook_credit_commission,
      google_credit_commission,
      facebook_application_fee,
      google_application_fee,
      facebook_credit_application_fee,
      google_credit_application_fee,
   } = req.body;

   if (!email || !username || !password || !full_name) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'All fields are required', false));
   }

   const feesAndCommissions = [
      facebook_application_fee,
      google_application_fee,
      facebook_credit_commission,
      google_credit_commission,
      facebook_commission,
      google_commission,
      facebook_credit_application_fee,
      google_credit_application_fee,
   ];

   if (feesAndCommissions.some((v) => v === undefined || v === null)) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Commission and application fee fields are required',
               false
            )
         );
   }

   if (feesAndCommissions.some((v) => Number(v) < 0)) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Commission and application fee fields cannot be negative',
               false
            )
         );
   }

   if (role !== 'user') {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Role must be user', false));
   }
   const user = await createUserService(req.body, req.agent._id);
   if (!user.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, user.message, false));
   }
   return res
      .status(201)
      .json(new ApiResponse(201, user.data, 'User created successfully', true));
});

exports.handleGetAllAssociatedUsers = asyncHandler(async (req, res) => {
   const agentId = req.agent._id;
   const users = await getAllUsersForSpecificAgentService(agentId);
   if (!users.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, users.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(200, users.data, 'Users retrieved successfully', true)
      );
});

exports.handleUpdateAgentProfile = asyncHandler(async (req, res) => {
   const agentId = req.agent._id;
   const updateData = req.body;

   const updatedAgent = await updateAgentProfileService(agentId, updateData);
   if (!updatedAgent.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, updatedAgent.message, false));
   }

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            updatedAgent.data,
            'Agent profile updated successfully',
            true
         )
      );
});
