const { comparePassword, hashPassword } = require('../../functions');
const { createUser, getUserByUsername } = require('../../repositories/user');
const { signToken } = require('../../utils/jwt');

const loginService = async (payload) => {
   const user = await getUserByUsername(payload.username);

   if (!user) {
      return {
         success: false,
         message: 'User not found',
         data: null,
      };
   }
   if (user.disabled) {
      return {
         success: false,
         message: 'Your account is disabled, please contact the administrator',
         data: null,
      };
   }

   const isPasswordValid = await comparePassword(
      payload.password,
      user.password
   );

   if (!isPasswordValid) {
      return {
         success: false,
         message: 'Invalid password',
         data: null,
      };
   }

   const token = signToken({
      userId: user._id.toString(),
      role: user.role,
   });

   const userData = user.toObject();
   delete userData.password;
   return {
      success: true,
      message: 'Login successful',
      data: {
         user: userData,
         token: token,
      },
   };
};

const createAdminService = async (payload) => {
   const admin = await getUserByUsername(payload.username);
   if (admin) {
      return {
         success: false,
         message: 'Admin already exists',
         data: null,
      };
   }

   const hashedPassword = await hashPassword(payload.password);
   payload.password = hashedPassword;

   const newAdmin = await createUser({
      ...payload,
      role: 'admin',
      disabled: false,
      isVerified: false,
      display_picture: null,
   });

   if (!newAdmin) {
      return {
         success: false,
         message: 'Failed to create admin',
         data: null,
      };
   }

   const token = signToken({
      userId: newAdmin._id.toString(),
      role: newAdmin.role,
   });

   const userData = newAdmin.toObject();
   delete userData.password;

   return {
      success: true,
      message: 'Admin created successfully',
      data: {
         user: userData,
         token: token,
      },
   };
};

module.exports = {
   loginService,
   createAdminService,
};
