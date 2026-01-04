const { createAdmin, createAgent } = require('../../services/admin');
const ApiResponse = require('../../utils/api_response/index');
const { asyncHandler } = require('../../utils/async_handler/index');

exports.handleCreateAdmin = asyncHandler(async (req, res) => {
   const { email, username, password, full_name, role = 'admin' } = req.body;

   if (!email || !username || !password || !full_name) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'All fields are required', false));
   }

   if (role !== 'admin') {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Role must be admin', false));
   }

   const admin = await createAdmin(req.body);
   if (!admin.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, admin.message, false));
   }
   return res
      .status(201)
      .json(
         new ApiResponse(201, admin.data, 'Admin created successfully', true)
      );
});

exports.handleCreateAgent = asyncHandler(async (req, res) => {
   const { email, username, password, full_name, role = 'agent' } = req.body;

   if (!email || !username || !password || !full_name) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'All fields are required', false));
   }

   if (role !== 'agent') {
      return res
         .status(400)
         .json(new ApiResponse(400, null, 'Role must be agent', false));
   }

   const agent = await createAgent(req.body);
   if (!agent.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, agent.message, false));
   }
   return res
      .status(201)
      .json(
         new ApiResponse(201, agent.data, 'Agent created successfully', true)
      );
});
