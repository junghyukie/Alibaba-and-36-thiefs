// src/services/authService.ts
import api from './api';
import type {
    User,
    RegisterResponse,
    LoginResponse,
    LoginCredentials,
    RegisterCredentials,
} from '../types/auth';

export async function register(
  credentials: RegisterCredentials
): Promise<User> {
  try {
    const res = await api.post<RegisterResponse>('/auth/register', credentials);
    return res.data.user;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'Registration failed');
  }
}

export async function login(
  credentials: LoginCredentials
): Promise<string> {
  try {
    const res = await api.post<LoginResponse>('/auth/login', credentials);
    const token = res.data.token;
    if (token) localStorage.setItem('token', token);
    return token || '';
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'Login failed');
  }
}

export async function getProfile(): Promise<User> {
  try {
    const res = await api.get<{ user: User }>('/user/profile');
    return res.data.user;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'Failed to fetch profile');
  }
}

export function logout(): void {
  localStorage.removeItem('token');
}
