const express = require('express');
const { isUser, isAdmin, isAgent } = require('../../middlewares/auth');
const {
   handleGetAllTransaction,
   handleGetMyTransaction,
   handleGetMyUserTransaction,
} = require('../../controllers/wallet_ledger');
const router = express.Router();

router.route('/get-all-transcation').get(isAdmin, handleGetAllTransaction);
router.route('/get-all-my-transaction').get(isUser, handleGetMyTransaction);
router
   .route('/get-my-user-transcation')
   .get(isAgent, handleGetMyUserTransaction);

module.exports = router;
