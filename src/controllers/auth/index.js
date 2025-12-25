const ApiResponse = require('../../utils/api_response/index');
const { asyncHandler } = require('../../utils/async_handler/index');
const { createAdminService, loginService } = require('../../services/auth');

const handleLogin = asyncHandler(async (req, res) => {
   const { username, password } = req.body;
   if (!username || !password) {
      return res
         .status(200)
         .json(
            new ApiResponse(400, null, 'Username and password are required')
         );
   }
   const result = await loginService({ username, password });
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

const handleCreateAdmin = asyncHandler(async (req, res) => {
   const { username, password, full_name, email, phone_number, organization } =
      req.body;
   if (!username || !password || !full_name || !email || !phone_number) {
      return res
         .status(200)
         .json(new ApiResponse(400, null, 'All fields are required'));
   }
   const result = await createAdminService({
      username,
      password,
      full_name,
      email,
      phone_number,
      organization,
   });
   if (result.success) {
      return res
         .status(200)
         .json(new ApiResponse(200, result.data, 'Admin created successfully'));
   } else {
      return res.status(200).json(new ApiResponse(400, null, result.message));
   }
});

module.exports = {
   handleLogin,
   handleCreateAdmin,
};
