import { comparePassword } from '../../functions';
import { getUserByUsername } from '../../repositories/user';
import { signToken } from '../../utils/jwt';
import { LoginInterface } from '../../types/index';

export const loginService = async (payload: LoginInterface) => {
   /* ---------------- Get User by Username ---------------- */
   const user = await getUserByUsername(payload.username);

   /* ---------------- Check if User exists ---------------- */
   if (!user) {
      return {
         success: false,
         message: 'User not found',
         data: null,
      };
   }
   /* ---------------- Check if User is disabled ---------------- */
   if (user.disabled) {
      return {
         success: false,
         message: 'Your account is disabled, please contact the administrator',
         data: null,
      };
   }

   /* ---------------- Check if Password is valid ---------------- */
   const isPasswordValid = await comparePassword(
      payload.password,
      user.password as string
   );

   /* ---------------- Check if Password is invalid ---------------- */
   if (!isPasswordValid) {
      return {
         success: false,
         message: 'Invalid password',
         data: null,
      };
   }

   /* ---------------- Generate Token ---------------- */
   const token = signToken({ userId: user._id.toString(), role: user.role });
   return {
      success: true,
      message: 'Login successful',
      data: {
         user: user,
         token: token,
      },
   };
};
