const express = require('express');
const { isUser } = require('../../middlewares/auth');
const {
   handleUpdateUserProfile,
   handleGetMyWallet,
   handleApplyGoogleAd,
   handleGetMyGoogleAdApplications,
   handleApplyFacebookAd,
   handleGetMyFacebookAdApplications,
   handleGetAllMyFacebookAccounts,
   handleGetAllMyGoogleAccounts,
} = require('../../controllers/user');
const router = express.Router();

router.route('/update-profile').patch(isUser, handleUpdateUserProfile);
router.route('/get-my-wallet').get(isUser, handleGetMyWallet);
router.route('/apply-google-ad').post(isUser, handleApplyGoogleAd);
router
   .route('/get-all-my-google-ad-applications')
   .get(isUser, handleGetMyGoogleAdApplications);
router.route('/apply-facebook-ad').post(isUser, handleApplyFacebookAd);
router
   .route('/get-all-my-facebook-ad-applications')
   .get(isUser, handleGetMyFacebookAdApplications);

router
   .route('/get-all-my-facebook-accounts')
   .get(isUser, handleGetAllMyFacebookAccounts);

router
   .route('/get-all-my-google-accounts')
   .get(isUser, handleGetAllMyGoogleAccounts);

module.exports = router;
