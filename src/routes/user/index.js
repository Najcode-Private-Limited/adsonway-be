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
   handleAddMoneyToGoogleAccount,
   handleAddMoneyToFacebookAccount,
   handleGetAllMyGoogleAccountTopupRequests,
   handleGetAllMyFacebookAccountTopupRequests,
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

router
   .route('/add-money-to-google-account/:id')
   .post(isUser, handleAddMoneyToGoogleAccount);
router
   .route('/add-money-to-facebook-account/:id')
   .post(isUser, handleAddMoneyToFacebookAccount);

router
   .route('/get-all-my-google-account-topup-requests')
   .get(isUser, handleGetAllMyGoogleAccountTopupRequests);

router
   .route('/get-all-my-facebook-account-topup-requests')
   .get(isUser, handleGetAllMyFacebookAccountTopupRequests);

module.exports = router;
