const express = require('express');
const { handleLogin, handleCreateAdmin } = require('../../controllers/auth');
const router = express.Router();

router.route('/login').post(handleLogin);

/* ---------------- Create Admin Route For Testing Purposes ---------------- */
router.route('/create-admin').post(handleCreateAdmin);

module.exports = router;
