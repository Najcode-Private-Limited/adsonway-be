const express = require('express');
const {
   isAdmin,
   isUser,
   generalAuthenticate,
} = require('../../middlewares/auth');
const {
   handleCreateNewRefundApplication,
   handleGetMyRefundApplications,
   handleGetAllRefundApplications,
   handleGetRefundApplicationById,
   handleUpdateRefundApplicationStatus,
} = require('../../controllers/refund_application');
const router = express.Router();

router
   .route('/create-refund-application')
   .post(isUser, handleCreateNewRefundApplication);
router
   .route('/get-my-refund-applications')
   .get(isUser, handleGetMyRefundApplications);
router
   .route('/get-all-refund-applications')
   .get(isAdmin, handleGetAllRefundApplications);
router
   .route('/get-refund-application/:id')
   .get(generalAuthenticate, handleGetRefundApplicationById);

router
   .route('/update-refund-application/:id')
   .patch(isAdmin, handleUpdateRefundApplicationStatus);

module.exports = router;
