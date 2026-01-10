const express = require('express');
const {
   handleCreatUser,
   handleGetAllAssociatedUsers,
   handleUpdateAgentProfile,
} = require('../../controllers/agents');
const { isAgent } = require('../../middlewares/auth');
const router = express.Router();

router.route('/create-user').post(isAgent, handleCreatUser);
router.route('/get-associated-users').get(isAgent, handleGetAllAssociatedUsers);
router.route('/update-profile').patch(isAgent, handleUpdateAgentProfile);

module.exports = router;
