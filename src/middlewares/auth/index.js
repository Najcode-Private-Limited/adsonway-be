const jwt = require('jsonwebtoken');
const user = require('../../models/user');
const ApiResponse = require('../../utils/api_response');

const isAdmin = async (req, res, next) => {
   try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
         return res
            .status(401)
            .json(new ApiResponse(401, null, 'Unauthorized', false));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await user.findById(decoded.userId);

      if (!admin || admin.role !== 'admin') {
         return res
            .status(403)
            .json(
               new ApiResponse(
                  403,
                  null,
                  'Access denied, This action requires admin role',
                  false
               )
            );
      }

      req.admin = admin;
      next();
   } catch (error) {
      res.status(403).json(
         new ApiResponse(403, null, 'Invalid or expired token', false)
      );
   }
};

const isUser = async (req, res, next) => {
   try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
         return res
            .status(401)
            .json(new ApiResponse(401, null, 'Unauthorized', false));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const users = await user.findById(decoded.userId);

      if (!users || users.role !== 'user') {
         return res
            .status(403)
            .json(
               new ApiResponse(
                  403,
                  null,
                  'Access denied, This action requires user role',
                  false
               )
            );
      }

      req.user = users;
      next();
   } catch (error) {
      res.status(403).json(
         new ApiResponse(403, null, 'Invalid or expired token', false)
      );
   }
};

const isAgent = async (req, res, next) => {
   try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
         return res
            .status(401)
            .json(new ApiResponse(401, null, 'Unauthorized', false));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const agent = await user.findById(decoded.userId);

      if (!agent || agent.role !== 'agent') {
         return res
            .status(403)
            .json(
               new ApiResponse(
                  403,
                  null,
                  'Access denied, This action requires agent role',
                  false
               )
            );
      }

      req.agent = agent;
      next();
   } catch (error) {
      res.status(403).json(
         new ApiResponse(403, null, 'Invalid or expired token', false)
      );
   }
};

const generalAuthenticate = async (req, res, next) => {
   try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
         return res
            .status(401)
            .json(new ApiResponse(401, null, 'Unauthorized', false));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
         return res
            .status(403)
            .json(
               new ApiResponse(403, null, 'Access denied, Invalid token', false)
            );
      }

      const authUser = await user.findById(decoded.userId);
      if (!authUser) {
         return res
            .status(403)
            .json(
               new ApiResponse(403, null, 'Access denied, Invalid user', false)
            );
      }
      next();
   } catch (error) {
      res.status(403).json(
         new ApiResponse(403, null, 'Invalid or expired token', false)
      );
   }
};

module.exports = { isAdmin, isUser, isAgent, generalAuthenticate };
