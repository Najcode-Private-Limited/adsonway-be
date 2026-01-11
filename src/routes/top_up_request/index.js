const express = require('express');
const {
   isAdmin,
   isUser,
   generalAuthenticate,
} = require('../../middlewares/auth');
const {
   handleCreateNewTopUpRequest,
   handleGetAllTopUpRequests,
   handleGetAllTopUpRequestsByUser,
   handleUpdateTopUpRequestStatus,
} = require('../../controllers/top_up_request');
const router = express.Router();

router.route('/add-top-up-request').post(isUser, handleCreateNewTopUpRequest);
router.route('/get-top-up-requests').get(isAdmin, handleGetAllTopUpRequests);
router
   .route('/get-user-top-up-requests/:id')
   .get(generalAuthenticate, handleGetAllTopUpRequestsByUser);

router
   .route('/update-top-up-request-status/:id')
   .patch(isAdmin, handleUpdateTopUpRequestStatus);

module.exports = router;
