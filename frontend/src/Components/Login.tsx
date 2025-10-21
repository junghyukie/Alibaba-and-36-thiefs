import React, { useState } from 'react';
import 'ionicons';
import "./style.css";
import * as auth from '../services/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      console.log('You must fill in email and password');
    }
    // Thêm logic xử lý đăng nhập (gọi API, validate, v.v.) ở đây
    try {
      const token = auth.login({email, password});
      console.log(token);
      try {
        const profile = auth.getProfile();
        console.log(profile);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="login-box bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <div className="input-box relative">
            <span className="icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <label className="absolute left-10 top-0 text-sm text-gray-500 pointer-events-none transition-all duration-200 transform -translate-y-1/2 scale-75 origin-left bg-white px-1">
              Email
            </label>
          </div>
          <div className="input-box relative">
            <span className="icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <label className="absolute left-10 top-0 text-sm text-gray-500 pointer-events-none transition-all duration-200 transform -translate-y-1/2 scale-75 origin-left bg-white px-1">
              Password
            </label>
          </div>
          <div className="remember-forgot flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={Login}
          >
            Login
          </button>
          <div className="register-link text-center text-sm">
            <p>
              Don&apos;t have an account?{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;