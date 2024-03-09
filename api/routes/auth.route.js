import express from 'express';
import { signup } from '../controllers/auth.controller.js'
const router = express.Router();

router.post('/signup', signup);
router.post('/signin',);
router.get('/signout',)

export default router;