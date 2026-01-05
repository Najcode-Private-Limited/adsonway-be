const { getAllUsersForSpecificAgentService } = require('../../services/admin');
const { createUserService } = require('../../services/agent');
const ApiResponse = require('../../utils/api_response/index');
const { asyncHandler } = require('../../utils/async_handler/index');

exports.handleCreatUser = asyncHandler(async (req, res) => {
   const { email, username, password, full_name, role = 'user' } = req.body;

   if (!email || !username || !password || !full_name) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'All fields are required', false));
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
