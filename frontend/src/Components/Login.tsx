import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IoniconsScripts = () => (
  <>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </>
);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      if (data.success) {
        localStorage.setItem("token", data.token);
        if (data.id_role === 1) {
          alert("Chao mung Users");
          navigate("/");
        } else if (data.id_role === 2) {
          alert("Chao mung Staff");
          // navigate("/staff");
        } else if (data.id_role === 3) {
          alert("Chao mung admin");
          // navigate("/admin");
        }
      } else {
        alert(data.message);
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
          background: url('https://www.thinkupthemes.com/blog/wp-content/uploads/2021/10/best-library-wordpress-themes.jpg') no-repeat;
          background-size: cover;
          background-position: center;
        }

        .box {
          position: relative;
          width: 400px;
          height: 450px;
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
            <h2>Login</h2>

            <div className="input-box">
              <span className="icon"><ion-icon name="mail"></ion-icon></span>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>

            <div className="input-box">
              <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            <div className="remember-forgot">
              <label><input type="checkbox" />Remember me</label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Login</button>

            <div className="register-link">
              <p>
                Don't have an account? 
                <a onClick={() => navigate('/register')}>Register</a>
              </p>
            </div>
          </form>
        </div>
      </section>

      <IoniconsScripts />
    </>
  );
};

export default Login;