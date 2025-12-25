import { comparePassword, hashPassword } from '../../functions';
import { createUser, getUserByUsername } from '../../repositories/user';
import { signToken } from '../../utils/jwt';
import { LoginInterface } from '../../types/index';
import { UserDocument } from '../../models/user';

export const loginService = async (payload: LoginInterface) => {
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
      user.password as string
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
      role: user.role as string,
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

export const createAdminService = async (payload: any) => {
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
   } as UserDocument);

   if (!newAdmin) {
      return {
         success: false,
         message: 'Failed to create admin',
         data: null,
      };
   }

   const token = signToken({
      userId: newAdmin._id.toString(),
      role: newAdmin.role as string,
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
