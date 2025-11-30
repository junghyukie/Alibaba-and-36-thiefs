// src/types/auth.ts
import { jwtDecode } from "jwt-decode";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginResponse {
  token: string;
}

export interface ProfileResponse {
  user: LoginCredentials
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

interface DecodedToken {
  email: string; 
  [key: string]: any;
}

export const getEmailFromToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.email; // Lấy email từ payload
  } catch (error) {
    console.error("Lỗi giải mã token:", error);
    return null;
  }
};