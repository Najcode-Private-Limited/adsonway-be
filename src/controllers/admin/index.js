const {
   updateGoogleAdApplication,
} = require('../../repositories/google_application');
const {
   createAdmin,
   createAgent,
   getAllAdminService,
   getAllAgentService,
   updateAdminProfileService,
   getAllGoogleAdApplicationsService,
} = require('../../services/admin');
const { getAllUsersForSpecificAgentService } = require('../../services/agent');
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

exports.handleGetAllAdmins = asyncHandler(async (req, res) => {
   const admins = await getAllAdminService();
   if (!admins.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, admins.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            admins.data,
            'Admins retrieved successfully',
            true
         )
      );
});

exports.handleGetAllAgents = asyncHandler(async (req, res) => {
   const agents = await getAllAgentService();
   if (!agents.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, agents.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            agents.data,
            'Agents retrieved successfully',
            true
         )
      );
});

exports.handleGetAllUsersForSpecificAgent = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const users = await getAllUsersForSpecificAgentService(id);
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

exports.handleUpdateAdminProfile = asyncHandler(async (req, res) => {
   const adminId = req.admin._id;
   const updateData = req.body;

   const updatedAdmin = await updateAdminProfileService(adminId, updateData);

   if (!updatedAdmin.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, updatedAdmin.message, false));
   }

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            updatedAdmin.data,
            'Admin profile updated successfully',
            true
         )
      );
});

exports.handleGetAllGoogleAdApplications = asyncHandler(async (req, res) => {
   const filters = req.query;
   const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
      sort: req.query.sort || '-1',
   };
   const result = await getAllGoogleAdApplicationsService(filters, options);
   if (!result.success) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, result.message, false));
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            result.data,
            'Google Ad applications retrieved successfully',
            true
         )
      );
});

exports.handleUpdateGoogleAdApplicationStatus = asyncHandler(
   async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const adminNote = req.body.admin_note || '';
      const result = await updateGoogleAdApplication(id, { status, adminNote });
      if (!result) {
         return res
            .status(400)
            .json(
               new ApiResponse(
                  400,
                  null,
                  'Failed to update application status',
                  false
               )
            );
      }
      return res
         .status(200)
         .json(
            new ApiResponse(
               200,
               result,
               'Google Ad application status updated successfully',
               true
            )
         );
   }
);
