const express = require('express');
const {
   handleCreatUser,
   handleGetAllAssociatedUsers,
} = require('../../controllers/agents');
const { isAgent } = require('../../middlewares/auth');
const router = express.Router();

router.route('/create-user').post(isAgent, handleCreatUser);
router.route('/get-associated-users').get(isAgent, handleGetAllAssociatedUsers);

module.exports = router;
