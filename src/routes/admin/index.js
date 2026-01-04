const express = require('express');
const {
   handleCreateAdmin,
   handleCreateAgent,
} = require('../../controllers/admin');
const { isAdmin } = require('../../middlewares/auth');
const router = express.Router();

router.route('/create-admin').post(isAdmin, handleCreateAdmin);
router.route('/create-agent').post(isAdmin, handleCreateAgent);

module.exports = router;
