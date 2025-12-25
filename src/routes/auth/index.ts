import express, { Router } from 'express';
import { handleLogin } from '../../controllers/auth';
const router = Router();

router.route('/login-admin').post(handleLogin);

export default router;
