import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { lockClosed, mail, person } from 'ionicons/icons';
const API_URL = import.meta.env.VITE_API_URL;

const IoniconsScripts = () => (
  <>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </>
);

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username, 'Email:', email, 'Password:', password);
    
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      
      if (data.success) {
        // 🔑 BƯỚC MỚI: Tự động lưu Token và điều hướng
        
        // 1. Lưu Token nhận được từ server vào LocalStorage
        localStorage.setItem("token", data.token);
        
        // 2. Xử lý điều hướng dựa trên vai trò nhận được từ server (luôn là DOC_GIA)
        if (data.vai_tro === "DOC_GIA") {
            // Hiển thị thông báo chào mừng cho vai trò DOC_GIA
            alert("Đăng ký thành công! Chào mừng User."); 
            // Điều hướng về trang PersonalnfoInsert
            navigate("/personal-info-insert"); 
        } 
        // Thêm các trường hợp khác nếu có (mặc dù đăng ký luôn là DOC_GIA)
        else {
             // Dành cho các vai trò khác nếu logic Backend thay đổi sau này
             alert(`Đăng ký thành công! Vai trò: ${data.vai_tro}`);
             navigate('/');
        }
        
      } else {
        alert("Đăng ký thất bại: " + data.message);
      }
      
    } catch (err) {
      alert("Lỗi kết nối server");
      console.error(err);
    }
};
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        section {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
          background: url('https://images2.alphacoders.com/104/1042582.jpg') no-repeat;
          background-size: cover;
          background-position: center;
        }

        .box {
          position: relative;
          width: 400px;
          height: 520px;
          background: transparent;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(15px);
        }

        h2 {
          font-size: 2em;
          color: #fff;
          text-align: center;
          font-weight: bold;
        }

        .input-box {
          position: relative;
          width: 310px;
          margin: 30px 0;
          border-bottom: 2px solid #fff;
        }

        .input-box .icon {
          position: absolute;
          right: 8px;
          color: #fff;
          font-size: 1.2em;
          line-height: 57px;
        }

        .input-box label {
          position: absolute;
          top: 50%;
          left: 5px;
          transform: translateY(-50%);
          font-size: 1em;
          color: #fff;
          pointer-events: none;
          transition: .5s;
        }

        .input-box input:focus ~ label,
        .input-box input:valid ~ label {
          top: -5px;
        }

        .input-box input {
          width: 100%;
          height: 50px;
          background: transparent;
          border: none;
          outline: none;
          font-size: 1em;
          color: #fff;
          padding: 0 35px 0 5px;
        }

        .remember-forgot {
          margin: -15px 0 15px;
          font-size: .9em;
          color: #fff;
          display: flex;
          justify-content: space-between;
        }

        .remember-forgot label input {
          margin-right: 3px;
        }

        .remember-forgot a {
          color: #fff;
          text-decoration: none;
        }

        .remember-forgot a:hover {
          text-decoration: underline;
        }

        button {
          width: 100%;
          height: 40px;
          background: #fff;
          border: none;
          outline: none;
          border-radius: 40px;
          cursor: pointer;
          font-size: 1em;
          color: #000;
          font-weight: 500;
        }

        .register-link {
          font-size: .9em;
          color: #fff;
          text-align: center;
          margin: 25px 0 10px;
        }

        .register-link p a {
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }

        .register-link p a:hover {
          text-decoration: underline;
        }

        .terms-link {
          color: #fff;
          text-decoration: none;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 360px) {
          .box {
            width: 100%;
            height: 100vh;
            border: none;
            border-radius: 0;
          }

          .input-box {
            width: 290px;
          }
        }
      `}</style>

      <section>
        <div className="box">
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <div className="input-box">
              <span className="icon"><IonIcon icon={person} /></span>
              <input 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Họ và tên</label>
            </div>

            <div className="input-box">
              <span className="icon"><IonIcon icon={mail} /></span>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>

            <div className="input-box">
              <span className="icon"><IonIcon icon={lockClosed} /></span>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" required />
                I agree to the <a href="#" className="terms-link">terms and conditions</a>
              </label>
            </div>

            <button type="submit">Register</button>

            <div className="register-link">
              <p>
                Already have an account? 
                <a onClick={() => navigate('/login')}>Login</a>
              </p>
            </div>
          </form>
        </div>
      </section>

      <IoniconsScripts />
    </>
  );
};

export default Register;