const express = require('express');
const { isUser } = require('../../middlewares/auth');
const {
   handleUpdateUserProfile,
   handleGetMyWallet,
   handleApplyGoogleAd,
   handleGetMyGoogleAdApplications,
   handleApplyFacebookAd,
   handleGetMyFacebookAdApplications,
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

module.exports = router;
