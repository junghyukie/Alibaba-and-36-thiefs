// src/types/auth.ts

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
  user?: LoginCredentials
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
