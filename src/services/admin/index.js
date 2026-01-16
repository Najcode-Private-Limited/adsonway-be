const e = require('express');
const { hashPassword, comparePassword } = require('../../functions');
const {
   getUsersByRole,
   updateUser,
   getUserById,
   checkExiststingInstance,
   createUser,
} = require('../../repositories/user');
const {
   getAllGoogleAdApplications,
} = require('../../repositories/google_application');

exports.createAdmin = async (adminData) => {
   const checkIfAdminExists = await checkExiststingInstance(
      adminData.username,
      adminData.email
   );

   if (checkIfAdminExists) {
      return {
         statusCode: 400,
         success: false,
         message: 'User already exists in the system',
         data: null,
      };
   }

   const payload = { ...adminData, role: 'admin' };

   const hashedPassword = await hashPassword(adminData.password);
   payload.password = hashedPassword;

   const newAdmin = await createUser(payload);

   if (!newAdmin) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to create admin',
         data: null,
      };
   }

   const userData = newAdmin.toObject();
   delete userData.password;

   return {
      statusCode: 201,
      success: true,
      message: 'Admin created successfully',
      data: userData,
   };
};

exports.createAgent = async (agentData) => {
   const checkIfAgentExists = await checkExiststingInstance(
      agentData.username,
      agentData.email
   );

   if (checkIfAgentExists) {
      return {
         statusCode: 400,
         success: false,
         message: 'User already exists in the system',
         data: null,
      };
   }

   const payload = { ...agentData, role: 'agent' };

   const hashedPassword = await hashPassword(agentData.password);
   payload.password = hashedPassword;

   const newAgent = await createUser(payload);

   if (!newAgent) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to create agent',
         data: null,
      };
   }

   const userData = newAgent.toObject();
   delete userData.password;

   return {
      statusCode: 201,
      success: true,
      message: 'Agent created successfully',
      data: userData,
   };
};

exports.getAllAdminService = async () => {
   const admins = await getUsersByRole('admin');
   if (!admins) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve admins',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Admins retrieved successfully',
      data: admins,
   };
};

exports.getAllAgentService = async () => {
   const agents = await getUsersByRole('agent');
   if (!agents) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve agents',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Agents retrieved successfully',
      data: agents,
   };
};

exports.updateAdminProfileService = async (adminId, updateData) => {
   const checkAdminExistance = await getUserById(adminId);

   if (!checkAdminExistance) {
      return {
         statusCode: 404,
         success: false,
         message: 'Admin not found',
         data: null,
      };
   }

   const payload = {};
   if (updateData.full_name) payload.full_name = updateData.full_name;
   if (updateData.username) payload.username = updateData.username;
   if (updateData.password) {
      if (comparePassword(updateData.password, checkAdminExistance.password)) {
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
   const updatedAdmin = await updateUser(adminId, payload);

   if (!updatedAdmin) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to update admin profile',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Admin profile updated successfully',
      data: updatedAdmin,
   };
};

exports.getAllGoogleAdApplicationsService = async (filters, options) => {
   const query = {};
   if (filters.status) {
      query.status = filters.status;
   }
   if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) {
         query.createdAt.$gte = filters.startDate;
      }
      if (filters.endDate) {
         query.createdAt.$lte = filters.endDate;
      }
   }
   const applications = await getAllGoogleAdApplications(query, options);
   if (!applications) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve Google Ad applications',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Google Ad applications retrieved successfully',
      data: {
         applications,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(applications.length / options.limit),
      },
   };
};
