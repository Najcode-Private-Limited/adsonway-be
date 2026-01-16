const express = require('express');
const { isUser } = require('../../middlewares/auth');
const {
   handleUpdateUserProfile,
   handleGetMyWallet,
   handleApplyGoogleAd,
   handleGetMyGoogleAdApplications,
} = require('../../controllers/user');
const router = express.Router();

router.route('/update-profile').patch(isUser, handleUpdateUserProfile);
router.route('/get-my-wallet').get(isUser, handleGetMyWallet);
router.route('/apply-google-ad').post(isUser, handleApplyGoogleAd);
router
   .route('/get-all-my-google-ad-applications')
   .get(isUser, handleGetMyGoogleAdApplications);

module.exports = router;
