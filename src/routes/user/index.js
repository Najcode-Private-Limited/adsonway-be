const express = require('express');
const { isUser } = require('../../middlewares/auth');
const {
   handleUpdateUserProfile,
   handleGetMyWallet,
} = require('../../controllers/user');
const router = express.Router();

router.route('/update-profile').patch(isUser, handleUpdateUserProfile);
router.route('/get-my-wallet').get(isUser, handleGetMyWallet);

module.exports = router;
