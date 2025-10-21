import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
import type {
    User,
    RegisterResponse,
    LoginResponse,
    LoginCredentials,
    RegisterCredentials,
} from '../types/auth';

export const registerUser = async ({ username, email, password } : RegisterCredentials) => {
    // Kiểm tra thông tin nhận được
    if (!username || !email || !password) {
        const err = new Error('username, email and password are required');
        throw err;
    }
    const normalizedEmail = email.trim().toLowerCase();

    // Kiểm tra email đã sử dụng
    const { rows: existing } = await pool.query(
        'SELECT id FROM accounts WHERE email = $1',
        [normalizedEmail]
    );
    if (existing.length > 0) {
        const err = new Error('Email already in use');
        throw err;
    }

    const hash = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query(
            `INSERT INTO accounts (username, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, username, email`,
            [username, normalizedEmail, hash]
        );
        const res: RegisterResponse = {
            user: result.rows[0] as User
        };
        return res;
    } catch (err : any) {
        // Postgres unique violation code
        if (err.code === '23505') {
            const dup = new Error('Email already in use');
            throw dup;
        }
        // rethrow other errors
        throw err;
    }
}

export const loginUser = async ( {email, password} : LoginCredentials ) => {
    // Kiểm tra thông tin nhận được
    if (!email || !password) {
        const err = new Error('email and password are required');
        throw err;
    }

    const result = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) throw new Error('User not found');

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error('Invalid password');

    const res: LoginResponse = {
        token: jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' })
    };

    return res;
}