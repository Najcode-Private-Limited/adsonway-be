const express = require('express');
const {
   handleGetAllPaymentMethod,
   handleGetSinglePaymentMethod,
   handleCreatePaymentMethod,
   handleUpdatePaymentMethod,
   handleDeletePaymentMethod,
} = require('../../controllers/payment_method');
const { isAdmin } = require('../../middlewares/auth');
const router = express.Router();

router.route('/get-all').get(isAdmin, handleGetAllPaymentMethod);
router
   .route('/get-single-method/:id')
   .get(isAdmin, handleGetSinglePaymentMethod);
router
   .route('/create-new-payment-method')
   .post(isAdmin, handleCreatePaymentMethod);
router
   .route('/update-payment-method/:id')
   .patch(isAdmin, handleUpdatePaymentMethod);
router
   .route('/delete-payment-method/:id')
   .delete(isAdmin, handleDeletePaymentMethod);

module.exports = router;
