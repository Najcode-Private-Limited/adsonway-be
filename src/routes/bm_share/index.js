const express = require('express');
const {
   isAdmin,
   isUser,
   generalAuthenticate,
} = require('../../middlewares/auth');

const {
   handleApplyBMShare,
   handleGetBMShareById,
   handleGetAllBMShareForUser,
   handleGetAllBMShares,
   handleUpdateBMShareById,
} = require('../../controllers/bm_share');
const router = express.Router();

router.route('/apply-bm-share').post(isUser, handleApplyBMShare);
router
   .route('/get-bm-share/:id')
   .get(generalAuthenticate, handleGetBMShareById);

router.route('/get-user-bm-shares').get(isUser, handleGetAllBMShareForUser);
router.route('/get-all-bm-shares').get(isAdmin, handleGetAllBMShares);
router.route('/update-bm-share/:id').patch(isAdmin, handleUpdateBMShareById);

module.exports = router;
