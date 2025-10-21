import express from 'express';
import { AuthRequest, verifyToken } from '../middleware/authMiddleware';
import { ProfileResponse } from '../types/auth';

const router = express.Router();

// tạm thời chưa có dịch vụ j cho user cả
router.get('/profile', verifyToken, (req : AuthRequest, res) => {
    const profile : ProfileResponse = {
        user: req.user
    }
    res.json(profile);
});

export default router;
