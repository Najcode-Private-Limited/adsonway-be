const express = require('express');
const {
   handleCreateAdmin,
   handleCreateAgent,
   handleGetAllAdmins,
   handleGetAllAgents,
   handleGetAllUsersForSpecificAgent,
   handleUpdateAdminProfile,
   handleGetAllGoogleAdApplications,
   handleUpdateGoogleAdApplicationStatus,
} = require('../../controllers/admin');
const { isAdmin } = require('../../middlewares/auth');
const router = express.Router();

router.route('/create-admin').post(isAdmin, handleCreateAdmin);
router.route('/create-agent').post(isAdmin, handleCreateAgent);
router.route('/get-admins').get(isAdmin, handleGetAllAdmins);
router.route('/get-agents').get(isAdmin, handleGetAllAgents);
router.route('/get-users/:id').get(isAdmin, handleGetAllUsersForSpecificAgent);
router.route('/update-profile').patch(isAdmin, handleUpdateAdminProfile);
router
   .route('/get-all-google-ad-applications')
   .get(isAdmin, handleGetAllGoogleAdApplications);

router
   .route('/update-google-ad-application-status/:id')
   .patch(isAdmin, handleUpdateGoogleAdApplicationStatus);

module.exports = router;
