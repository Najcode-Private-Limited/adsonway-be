const express = require('express');
const { handleCreatUser } = require('../../controllers/agents');
const { isAgent } = require('../../middlewares/auth');
const router = express.Router();

router.route('/create-user').post(isAgent, handleCreatUser);

module.exports = router;
