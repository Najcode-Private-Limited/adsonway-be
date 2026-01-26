const e = require('express');
const { hashPassword, comparePassword } = require('../../functions');
const {
   getUsersByRole,
   updateUser,
   getUserById,
   checkExiststingInstance,
   createUser,
   getAllUsers,
} = require('../../repositories/user');
const {
   getAllGoogleAdApplications,
} = require('../../repositories/google_application');
const {
   getAllFacebookAdApplications,
} = require('../../repositories/facebook_application');
const {
   createNewGoogleAccount,
   getAllGoogleAccounts,
   getGoogleAccountById,
   updateGoogleAccountById,
} = require('../../repositories/google_account');
const {
   createNewFacebookAccount,
   getAllFacebookAccounts,
   updateFacebookAccountById,
   getFacebookAccountById,
} = require('../../repositories/facebook_account');
const {
   getPaymentFeeRuleForUser,
} = require('../../repositories/payment_fee_rules');
const user = require('../../models/user');
const {
   getRequestTopupGoogleIds,
} = require('../../repositories/request_topoup_google_id');
const {
   getRequestTopupFacebookIds,
} = require('../../repositories/request_topup_facebook_id');

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

exports.getAllFacebookAdApplicationsService = async (filters, options) => {
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
   const applications = await getAllFacebookAdApplications(query, options);
   if (!applications) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve Facebook Ad applications',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Facebook Ad applications retrieved successfully',
      data: {
         applications,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(applications.length / options.limit),
      },
   };
};

exports.createNewGoogleAdAccountService = async (accountData) => {
   const result = await createNewGoogleAccount(accountData);
   if (!result) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to create Google Ad account',
         data: null,
      };
   }
   return {
      statusCode: 201,
      success: true,
      message: 'Google Ad account created successfully',
      data: result,
   };
};

exports.createNewFacebookAdAccountService = async (accountData) => {
   const result = await createNewFacebookAccount(accountData);
   if (!result) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to create Facebook Ad account',
         data: null,
      };
   }
   return {
      statusCode: 201,
      success: true,
      message: 'Facebook Ad account created successfully',
      data: result,
   };
};

exports.getAllFacebookAdAccountsService = async (filters, options) => {
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
   const accounts = await getAllFacebookAccounts(query, options);
   if (!accounts) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve Facebook Ad accounts',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Facebook Ad accounts retrieved successfully',
      data: {
         accounts,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(accounts.length / options.limit),
      },
   };
};

exports.getAllGoogleAccountsService = async (filters, options) => {
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
   const accounts = await getAllGoogleAccounts(query, options);
   if (!accounts) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve Google Ad accounts',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Google Ad accounts retrieved successfully',
      data: {
         accounts,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(accounts.length / options.limit),
      },
   };
};

exports.updateGoogleAccountService = async (accountId, data) => {
   const checkAccountExistance = await getGoogleAccountById(accountId);

   if (!checkAccountExistance) {
      return {
         statusCode: 404,
         success: false,
         message: 'Google Ad account not found',
         data: null,
      };
   }
   const payload = {};
   if (data.status) payload.status = data.status;
   if (data.account_name) payload.account_name = data.account_name;
   if (data.account_id) payload.account_id = data.account_id;

   const result = await updateGoogleAccountById(accountId, payload);
   if (!result) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to update Google Ad account',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Google Ad account updated successfully',
      data: result,
   };
};

exports.updateFacebookAccountService = async (accountId, data) => {
   const checkAccountExistance = await getFacebookAccountById(accountId);

   if (!checkAccountExistance) {
      return {
         statusCode: 404,
         success: false,
         message: 'Facebook Ad account not found',
         data: null,
      };
   }

   const payload = {};
   if (data.status) payload.status = data.status;
   if (data.account_name) payload.account_name = data.account_name;
   if (data.account_id) payload.account_id = data.account_id;

   const result = await updateFacebookAccountById(accountId, payload);
   if (!result) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to update Facebook Ad account',
         data: null,
      };
   }
   return {
      statusCode: 200,
      success: true,
      message: 'Facebook Ad account updated successfully',
      data: result,
   };
};

exports.getAllUsersService = async (filters) => {
   const query = {};
   if (filters.search) {
      query.$or = [
         { username: { $regex: filters.search, $options: 'i' } },
         { email: { $regex: filters.search, $options: 'i' } },
         { full_name: { $regex: filters.search, $options: 'i' } },
      ];
   }
   const users = await getAllUsers(query);

   if (!users) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve users',
         data: null,
      };
   }

   const usersWithRules = await Promise.all(
      users.map(async (user) => {
         const paymentRule = await getPaymentFeeRuleForUser(user._id);

         return {
            ...(user.toObject?.() ?? user),
            paymentRule: paymentRule || null,
         };
      })
   );
   return {
      statusCode: 200,
      success: true,
      message: 'Users retrieved successfully',
      data: usersWithRules,
   };
};

exports.getAllRequestTopupGoogleIdAdminService = async (filters, options) => {
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
   const requests = await getRequestTopupGoogleIds(query, options);
   if (!requests) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve Google ID top-up requests',
         data: null,
      };
   }

   return {
      statusCode: 200,
      success: true,
      message: 'Google ID top-up requests retrieved successfully',
      data: {
         requests,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(requests.length / options.limit),
      },
   };
};

exports.getAllRequestTopupFacebookIdAdminService = async (filters, options) => {
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
   const requests = await getRequestTopupFacebookIds(query, options);
   if (!requests) {
      return {
         statusCode: 500,
         success: false,
         message: 'Failed to retrieve Facebook ID top-up requests',
         data: null,
      };
   }

   return {
      statusCode: 200,
      success: true,
      message: 'Facebook ID top-up requests retrieved successfully',
      data: {
         requests,
         page: options.page,
         limit: options.limit,
         totalPages: Math.ceil(requests.length / options.limit),
      },
   };
};
