import express, { Router } from 'express';
import { handleLogin, handleCreateAdmin } from '../../controllers/auth';
const router = Router();

router.route('/login-admin').post(handleLogin);

/* ---------------- Create Admin Route For Testing Purposes ---------------- */
router.route('/create-admin').post(handleCreateAdmin);

export default router;
