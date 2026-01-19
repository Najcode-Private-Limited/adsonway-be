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
   handleUpdateFacebookAdApplicationStatus,
   handleGetAllFacebookAdApplications,
   handleCreateNewFacebookAdAccount,
   handleCreateNewGoogleAdAccount,
   handleGetAllFacebookAdAccounts,
   handleGetAllGoogleAdAccounts,
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

router
   .route('/get-all-facebook-ad-applications')
   .get(isAdmin, handleGetAllFacebookAdApplications);
router
   .route('/update-facebook-ad-application-status/:id')
   .patch(isAdmin, handleUpdateFacebookAdApplicationStatus);

router
   .route('/create-new-facebook-ad-account')
   .post(isAdmin, handleCreateNewFacebookAdAccount);

router
   .route('/create-new-google-ad-account')
   .post(isAdmin, handleCreateNewGoogleAdAccount);

router
   .route('/get-all-facebook-accounts')
   .get(isAdmin, handleGetAllFacebookAdAccounts);

router
   .route('/get-all-google-accounts')
   .get(isAdmin, handleGetAllGoogleAdAccounts);

module.exports = router;
