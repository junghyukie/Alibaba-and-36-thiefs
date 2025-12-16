import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { IonIcon } from '@ionic/react';  // nếu bạn cài @ionic/react
import { lockClosed } from 'ionicons/icons';

const IoniconsScripts = () => (
  <>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </>
);

const PasswordChange: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ current: '', password: '', confirm: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.current) { alert('Vui lòng nhập mật khẩu hiện tại'); return; }
    if (!form.password) { alert('Vui lòng nhập mật khẩu mới'); return; }
    if (form.password !== form.confirm) { alert('Mật khẩu mới không khớp'); return; }
    // TODO: call API to change password
    alert('Mật khẩu đã được thay đổi thành công');
    navigate('/accinfo');
  };

  return (
    <>
      <Header/>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Poppins',sans-serif; }
        section { display:flex; justify-content:center; align-items:center; min-height:calc(100vh - 64px); width:100%; padding:20px; background:url('https://images2.alphacoders.com/104/1042582.jpg') no-repeat center/cover; }
        .box { width:420px; max-width:95vw; height:85vh; max-height:750px; background:rgba(255,255,255,0.96); border-radius:24px; border:2px solid rgba(255,255,255,0.6); box-shadow:0 20px 50px rgba(0,0,0,0.3); overflow:hidden; display:flex; flex-direction:column; }
        .header { padding:24px 20px 16px; text-align:center; background:rgba(255,255,255,0.98); position:sticky; top:0; z-index:10; box-shadow:0 2px 10px rgba(0,0,0,0.1); }
        .header h2 { font-size:2.1em; color:#1e3a8a; font-weight:700; }
        .scroll-area { flex:1; overflow-y:auto; padding:10px 30px 20px; scrollbar-width:thin; }
        .scroll-area::-webkit-scrollbar { width:6px; }
        .scroll-area::-webkit-scrollbar-thumb { background:#888; border-radius:3px; }
        .input-box { position:relative; width:100%; margin:26px 0; border-bottom:2px solid #666; }
        .input-box .icon { position:absolute; right:8px; color:#333; font-size:1.3em; line-height:57px; }
        .input-box label { position:absolute; top:50%; left:5px; transform:translateY(-50%); font-size:1em; color:#333; pointer-events:none; transition:.4s; }
        .input-box input:focus ~ label, .input-box input:valid ~ label { top:-5px; font-size:0.85em; color:#1e40af; }
        .input-box input { width:100%; height:50px; background:transparent; border:none; outline:none; font-size:1em; color:#333; padding:0 35px 0 5px; }
        .footer { padding:20px; background:rgba(255,255,255,0.98); position:sticky; bottom:0; z-index:10; box-shadow:0 -2px 10px rgba(0,0,0,0.1); }
        .footer button { width:100%; height:50px; background:#1e40af; color:white; border:none; border-radius:50px; font-size:1.1em; font-weight:600; cursor:pointer; transition:all .3s; }
        .footer button:hover { background:#1e3a8a; transform:translateY(-2px); box-shadow:0 8px 20px rgba(30,64,175,0.4); }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section>
        <div className="box">
          <div className="header">
            <h2>Thay đổi mật khẩu</h2>
          </div>

          <div className="scroll-area">
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="input-box">
                <span className="icon"><IonIcon icon={lockClosed} /></span>
                <input type="password" name="current" value={form.current} onChange={handleChange} required />
                <label>Mật khẩu hiện tại</label>
              </div>

              <div className="input-box">
                <span className="icon"><IonIcon icon={lockClosed} /></span>
                <input type="password" name="password" value={form.password} onChange={handleChange} required />
                <label>Mật khẩu mới</label>
              </div>

              <div className="input-box">
                <span className="icon"><IonIcon icon={lockClosed} /></span>
                <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required />
                <label>Xác nhận mật khẩu</label>
              </div>
            </form>
          </div>

          <div className="footer">
            <button onClick={handleSave}>Lưu mật khẩu</button>
          </div>
        </div>
      </section>

      <IoniconsScripts />
    </>
  );
};

export default PasswordChange;
