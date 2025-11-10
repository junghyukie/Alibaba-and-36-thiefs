import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IoniconsScripts = () => (
  <>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </>
);

// Giả lập dữ liệu
const get_email = () => "anhhai@gmail.com";
const get_username = () => "anhhai123";
const get_fullname = () => "Nguyễn Văn Hai";
const get_phone = () => "0909123456";
const get_dob = () => "2000-01-01";
const get_address = () => "số 10 Đan Phượng, Hà Nội";

const AccountInfo: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", username: "", password: "", confirm: "",
    fullname: "", phone: "", dob: "", address: ""
  });

  useEffect(() => {
    setForm({
      email: get_email(),
      username: get_username(),
      password: "",
      confirm: "",
      fullname: get_fullname(),
      phone: get_phone(),
      dob: get_dob(),
      address: get_address()
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (form.password && form.password !== form.confirm) {
      alert("Mật khẩu không khớp!");
      return;
    }
    alert("Cập nhật thành công!");
  };

  return (
    <>
      {/* TOÀN BỘ CSS + SCROLL + HEADER + BUTTON CỐ ĐỊNH */}
      <style jsx>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Poppins',sans-serif; }
        section {
          display:flex; justify-content:center; align-items:center;
          min-height:100vh; width:100%; padding:20px;
          background:url('https://images2.alphacoders.com/104/1042582.jpg') no-repeat center/cover;
        }
        .box {
          width:420px; max-width:95vw; height:85vh; max-height:750px;
          background:rgba(255,255,255,0.96);
          border-radius:24px; border:2px solid rgba(255,255,255,0.6);
          box-shadow:0 20px 50px rgba(0,0,0,0.3);
          overflow:hidden; display:flex; flex-direction:column;
        }
        /* HEADER CỐ ĐỊNH */
        .header {
          padding:24px 20px 16px; text-align:center; background:rgba(255,255,255,0.98);
          position:sticky; top:0; z-index:10;
          box-shadow:0 2px 10px rgba(0,0,0,0.1);
        }
        .header h2 {
          font-size:2.1em; color:#1e3a8a; font-weight:700;
        }
        /* NỘI DUNG CUỘN */
        .scroll-area {
          flex:1; overflow-y:auto; padding:10px 30px 20px;
          scrollbar-width:thin;
        }
        .scroll-area::-webkit-scrollbar { width:6px; }
        .scroll-area::-webkit-scrollbar-thumb {
          background:#888; border-radius:3px;
        }
        /* INPUT BOX */
        .input-box {
          position:relative; width:100%; margin:26px 0;
          border-bottom:2px solid #666;
        }
        .input-box .icon {
          position:absolute; right:8px; color:#333;
          font-size:1.3em; line-height:57px;
        }
        .input-box label {
          position:absolute; top:50%; left:5px;
          transform:translateY(-50%); font-size:1em; color:#333;
          pointer-events:none; transition:.4s;
        }
        .input-box input:focus ~ label,
        .input-box input:valid ~ label {
          top:-5px; font-size:0.85em; color:#1e40af;
        }
        .input-box input {
          width:100%; height:50px; background:transparent;
          border:none; outline:none; font-size:1em; color:#333;
          padding:0 35px 0 5px;
        }
        .input-box.date-input label {
          position:static; transform:none; color:#333;
          font-size:1em; margin-bottom:8px; display:block;
        }
        .input-box.date-input input {
          padding-left:5px; color:#333;
        }
        /* NÚT CỐ ĐỊNH DƯỚI */
        .footer {
          padding:20px; background:rgba(255,255,255,0.98);
          position:sticky; bottom:0; z-index:10;
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

      {/* FONT POPPINS */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section>
        <div className="box">
          {/* HEADER CỐ ĐỊNH */}
          <div className="header">
            <h2>Thông tin tài khoản</h2>
          </div>

          {/* NỘI DUNG CUỘN */}
          <div className="scroll-area">
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              {/* Email */}
              <div className="input-box">
                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
                <label>Email</label>
              </div>

              {/* Tên đăng nhập */}
              <div className="input-box">
                <span className="icon"><ion-icon name="person"></ion-icon></span>
                <input type="text" name="username" value={form.username} onChange={handleChange} required />
                <label>Tên đăng nhập</label>
              </div>

              {/* Mật khẩu mới */}
              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input type="password" name="password" value={form.password} onChange={handleChange} />
                <label>Mật khẩu mới</label>
              </div>

              {/* Xác nhận */}
              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input type="password" name="confirm" value={form.confirm} onChange={handleChange} />
                <label>Xác nhận mật khẩu</label>
              </div>

              {/* Họ tên */}
              <div className="input-box">
                <span className="icon"><ion-icon name="person-circle"></ion-icon></span>
                <input type="text" name="fullname" value={form.fullname} onChange={handleChange} required />
                <label>Họ và tên</label>
              </div>

              {/* Số điện thoại */}
              <div className="input-box">
                <span className="icon"><ion-icon name="call"></ion-icon></span>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                />
                <label>Số điện thoại</label>
              </div>

              {/* Ngày sinh */}
              <div className="input-box date-input">
                <span className="icon"><ion-icon name="calendar"></ion-icon></span>
                <label>Ngày sinh</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  style={{ color: '#333' }}
                />
              </div>

              {/* Địa chỉ */}
              <div className="input-box">
                <span className="icon"><ion-icon name="location"></ion-icon></span>
                <input type="text" name="address" value={form.address} onChange={handleChange} required />
                <label>Địa chỉ</label>
              </div>
            </form>
          </div>

          {/* NÚT CỐ ĐỊNH DƯỚI */}
          <div className="footer">
            <button onClick={handleSave}>Lưu thay đổi</button>
          </div>
        </div>
      </section>

      <IoniconsScripts />
    </>
  );
};

export default AccountInfo;