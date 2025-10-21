import React, { useState } from 'react';
import 'ionicons';
import "./style.css";

 
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    // Thêm logic xử lý đăng nhập (gọi API, validate, v.v.) ở đây
   try {
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
   // alert(data.message); // thông báo từ server
   if(data.success){
    if(data.id_role === 1){
      alert("Chao mung Users")
    //  navigate("/user")
    }
    else if(data.id_role === 2){
      alert("Chao mung Staff")
      //navigate("/staff")
    }
    else if(data.id_role === 3){
      alert("Chao mung admin")
      //navigate("/admin")
    }
   }
   else{
    alert(data.message)
   }
    
  } catch (err) {
    alert("Lỗi kết nối server");
    console.error(err);
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