const { hashPassword } = require('../../functions');
const {
   checkExiststingInstance,
   createUser,
} = require('../../repositories/user');

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
