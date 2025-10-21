import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { LoginCredentials } from '../types/auth';

interface JwtPayload {
  email: string;
  password: string; // include only if you’re sure it’s there
}
export interface AuthRequest extends Request {
  user?: LoginCredentials;
}

// Bảo mật user route bằng jwt
export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}
