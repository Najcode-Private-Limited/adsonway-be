const { hashPassword } = require('../../functions');
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

   const payload = { ...agentData, role: 'user' };

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

   return {
      statusCode: 201,
      success: true,
      message: 'User created successfully',
      data: userData,
   };
};
