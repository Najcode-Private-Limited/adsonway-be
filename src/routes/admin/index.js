const express = require('express');
const {
   handleCreateAdmin,
   handleCreateAgent,
   handleGetAllAdmins,
   handleGetAllAgents,
   handleGetAllUsersForSpecificAgent,
} = require('../../controllers/admin');
const { isAdmin } = require('../../middlewares/auth');
const router = express.Router();

router.route('/create-admin').post(isAdmin, handleCreateAdmin);
router.route('/create-agent').post(isAdmin, handleCreateAgent);
router.route('/get-admins').get(isAdmin, handleGetAllAdmins);
router.route('/get-agents').get(isAdmin, handleGetAllAgents);
router.route('/get-users/:id').get(isAdmin, handleGetAllUsersForSpecificAgent);

module.exports = router;
