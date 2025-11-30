import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonInfoInsert: React.FC = () => {
  const [hoTen, setHoTen] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hoTen || !ngaySinh || !dienThoai || !diaChi || !gioiTinh) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const formData = {
      ho_ten: hoTen,
      ngay_sinh: ngaySinh,
      dien_thoai: dienThoai,
      dia_chi: diaChi,
      gioi_tinh: gioiTinh,
    };

    try {
      const res = await fetch("http://localhost:3001/api/auth/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        alert('Lỗi: ' + (data.message || 'Không gửi được dữ liệu'));
        return;
      }

      alert(data.message || 'Cập nhật thành công!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi gửi dữ liệu (Kiểm tra xem server backend có đang chạy không).');
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
          /* FIX: Thêm màu nền tối để chữ trắng luôn hiển thị kể cả khi ảnh lỗi */
          background-color: #2c3e50; 
          background-image: url('https://images2.alphacoders.com/104/1042582.jpg');
          background-repeat: no-repeat;
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
          /* Thêm viền nhẹ để dễ nhìn vùng form */
          border: 1px solid rgba(255,255,255,0.2); 
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        .person-box {
          height: 600px; /* Tăng nhẹ chiều cao để không bị chật */
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

        .input-box.date-input label {
          position: static;
          transform: none;
          color: #fff;
          font-size: 1em;
          margin-bottom: 8px;
          display: block;
          pointer-events: auto;
        }

        .input-box.date-input input {
          padding-left: 5px;
        }

        .input-box.date-input {
          border-bottom: 2px solid #fff;
          padding-top: 20px;
        }

        .gender-selection {
          margin: 10px 0 20px;
          font-size: .9em;
          color: #fff;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 20px;
          width: 310px;
        }

        .gender-selection label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .gender-selection label input {
          margin-right: 5px;
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
          margin-top: 10px;
        }

        @media (max-width: 360px) {
          .box {
            width: 100%;
            height: 100vh;
            border: none;
            border-radius: 0;
          }
          .input-box, .gender-selection {
            width: 290px;
          }
        }
      `}</style>

      <section>
        <div className="box person-box">
          <form onSubmit={handleSubmit}>
            <h2>Thông tin cá nhân</h2>

            {/* Họ và tên */}
            <div className="input-box">
              <span className="icon"><ion-icon name="person"></ion-icon></span>
              <input
                type="text"
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
                required
              />
              <label>Họ và tên</label>
            </div>

            {/* Ngày sinh */}
            <div className="input-box date-input">
              <span className="icon"></span>
              <label>Ngày sinh</label>
              <input
                type="date"
                value={ngaySinh}
                onChange={(e) => setNgaySinh(e.target.value)}
                required
                style={{ color: '#fff' }}
              />
            </div>

            {/* Số điện thoại */}
            <div className="input-box">
              <span className="icon"><ion-icon name="call"></ion-icon></span>
              <input
                type="text"
                value={dienThoai}
                onChange={(e) => setDienThoai(e.target.value)}
                required
                pattern="[0-9]*"
                inputMode="numeric"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) e.preventDefault();
                }}
              />
              <label>Số điện thoại</label>
            </div>

            {/* Địa chỉ */}
            <div className="input-box">
              <span className="icon"><ion-icon name="location"></ion-icon></span>
              <input
                type="text"
                value={diaChi}
                onChange={(e) => setDiaChi(e.target.value)}
                required
              />
              <label>Địa chỉ</label>
            </div>

            {/* Giới tính */}
            <div className="gender-selection">
              <span style={{ marginRight: '10px' }}>Giới tính:</span>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gioiTinh === 'male'}
                  onChange={(e) => setGioiTinh(e.target.value)}
                /> Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gioiTinh === 'female'}
                  onChange={(e) => setGioiTinh(e.target.value)}
                /> Nữ
              </label>
            </div>

            <button type="submit">Cập nhật</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default PersonInfoInsert;