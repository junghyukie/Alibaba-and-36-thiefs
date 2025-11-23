import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const IoniconsScripts = () => (
  <>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </>
);

// Giả lập dữ liệu (exported so other components can import)
export const get_email = () => "anhhai@gmail.com";
const get_username = () => "anhhai123";
export const get_fullname = () => "Nguyễn Văn Hai";
export const get_phone = () => "0909123456";
const get_dob = () => "2000-01-01";
const get_address = () => "số 10 Đan Phượng, Hà Nội";

const AccountInfo: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", username: "", password: "",
    fullname: "", phone: "", dob: "", address: ""
  });

  useEffect(() => {
    setForm({
      email: get_email(),
      username: get_username(),
      password: "",
      fullname: get_fullname(),
      phone: get_phone(),
      dob: get_dob(),
      address: get_address()
    });
  }, []);

  return (
    <>
      <Header />
      {/* ==================== CSS ==================== */}
      <style jsx>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Poppins',sans-serif; }
        section {
          display:flex; justify-content:center; align-items:center;
          min-height:calc(100vh - 64px); width:100%; padding:20px;
          background:url('https://images2.alphacoders.com/104/1042582.jpg') no-repeat center/cover;
        }
        .box {
          width:420px; max-width:95vw; height:85vh; max-height:750px;
          background:rgba(255,255,255,0.96);
          border-radius:24px; border:2px solid rgba(255,255,255,0.6);
          box-shadow:0 20px 50px rgba(0,0,0,0.3);
          overflow:hidden; display:flex; flex-direction:column;
        }

        /* HEADER */
        .header {
          padding:24px 20px 16px; text-align:center; background:rgba(255,255,255,0.98);
          box-shadow:0 2px 10px rgba(0,0,0,0.1);
        }
        .header h2 { font-size:2.1em; color:#1e3a8a; font-weight:700; }

        /* SCROLL AREA */
        .scroll-area {
          flex:1; overflow-y:auto; padding:20px 30px 40px;
          scrollbar-width:thin;
        }
        .scroll-area::-webkit-scrollbar { width:6px; }
        .scroll-area::-webkit-scrollbar-thumb { background:#888; border-radius:3px; }

        /* ----------------- INFO BOX (chỉ hiển thị) ----------------- */
        .info-box {
          position:relative; width:100%; margin:26px 0;
          border-bottom:2px solid #666;
        }
        .info-box .icon {
          position:absolute; right:8px; color:#333;
          font-size:1.3em; line-height:50px;   /* đồng bộ với height input */
        }
        .info-box label {
          position:absolute; top:50%; left:5px;
          transform:translateY(-50%); font-size:1em; color:#333;
          pointer-events:none; transition:.4s;
        }
        /* Khi input có giá trị → label lên trên */
        .info-box input:not(:placeholder-shown) ~ label,
        .info-box input:focus ~ label {
          top:-5px; font-size:0.85em; color:#1e40af;
        }
        .info-box input {
          width:100%; height:50px; background:transparent;
          border:none; outline:none; font-size:1em; color:#333;
          padding:0 35px 0 5px;
          cursor:default;   /* không cho cảm giác có thể chỉnh sửa */
        }

        /* Trường ngày sinh (type=date) */
        .info-box.date-input label {
          position:static; transform:none; color:#333;
          font-size:1em; margin-bottom:8px; display:block;
        }
        .info-box.date-input input {
          padding-left:5px; color:#333;
        }

        /* ----------------- INPUT BOX (giữ lại cho các form khác) ----------------- */
        .input-box { /* giữ nguyên nếu cần ở trang khác */ }

        /* FOOTER */
        .footer {
          padding:20px; background:rgba(255,255,255,0.98);
          box-shadow:0 -2px 10px rgba(0,0,0,0.1);
        }
        .footer button {
          width:100%; height:50px; background:#1e40af; color:white;
          border:none; border-radius:50px; font-size:1.1em; font-weight:600;
          cursor:pointer; transition:all .3s;
        }
        .footer button:hover {
          background:#1e3a8a; transform:translateY(-2px);
          box-shadow:0 8px 20px rgba(30,64,175,0.4);
        }

        @media (max-width:480px) {
          .box { border-radius:18px; }
          .header h2 { font-size:1.9em; }
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <section>
          <div className="box">
          {/* HEADER */}
          <div className="header">
            <h2>Thông tin tài khoản</h2>
          </div>

          {/* SCROLL AREA */}
          <div className="scroll-area">
            <form onSubmit={e => e.preventDefault()}>
              {/* Email */}
              <div className="info-box">
                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                <input type="email" value={form.email} readOnly placeholder=" " />
                <label>Email</label>
              </div>

              {/* Tên đăng nhập */}
              <div className="info-box">
                <span className="icon"><ion-icon name="person"></ion-icon></span>
                <input type="text" value={form.username} readOnly placeholder=" " />
                <label>Tên đăng nhập</label>
              </div>

              {/* Mật khẩu */}
              <div className="info-box">
                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input type="password" value="********" readOnly placeholder=" " />
                <label>Mật khẩu</label>
              </div>

              {/* Họ tên */}
              <div className="info-box">
                <span className="icon"><ion-icon name="person-circle"></ion-icon></span>
                <input type="text" value={form.fullname} readOnly placeholder=" " />
                <label>Họ và tên</label>
              </div>

              {/* Số điện thoại */}
              <div className="info-box">
                <span className="icon"><ion-icon name="call"></ion-icon></span>
                <input type="text" value={form.phone} readOnly placeholder=" " />
                <label>Số điện thoại</label>
              </div>

              {/* Ngày sinh – vẫn dùng .info-box + .date-input */}
              <div className="info-box date-input">
                <span className="icon"><ion-icon name="calendar"></ion-icon></span>
                <label>Ngày sinh</label>
                <input type="date" value={form.dob} readOnly />
              </div>

              {/* Địa chỉ */}
              <div className="info-box">
                <span className="icon"><ion-icon name="location"></ion-icon></span>
                <input type="text" value={form.address} readOnly placeholder=" " />
                <label>Địa chỉ</label>
              </div>
            </form>
          </div>

          {/* FOOTER */}
          <div className="footer">
            <button onClick={() => navigate('/password-change')}>Thay đổi mật khẩu</button>
          </div>
        </div>
      </section>
      </div>

      <IoniconsScripts />
    </>
  );
};

export default AccountInfo;