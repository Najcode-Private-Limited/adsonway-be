const express = require('express');
const { isUser } = require('../../middlewares/auth');
const { handleUpdateUserProfile } = require('../../controllers/user');
const router = express.Router();

router.route('/update-profile').patch(isUser, handleUpdateUserProfile);

module.exports = router;
