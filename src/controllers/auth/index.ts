import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../../utils/api_response/index';
import { asyncHandler } from '../../utils/async_handler/index';
import { loginService } from '../../services/auth';
import { LoginInterface } from '../../types/index';

export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
   const { username, password } = req.body;

   /* ---------------- Check if Username and Password are required ---------------- */
   if (!username || !password) {
      return res
         .status(200)
         .json(
            new ApiResponse(400, null, 'Username and password are required')
         );
   }
   /* ---------------- Login Service ---------------- */
   const result = await loginService({ username, password } as LoginInterface);

   /* ---------------- Check if Login is successful ---------------- */
   if (result.success) {
      return res
         .status(200)
         .json(new ApiResponse(200, result.data, 'Login successful'));
   } else {
      return res
         .status(200)
         .json(new ApiResponse(401, null, 'Invalid username or password'));
   }
});
