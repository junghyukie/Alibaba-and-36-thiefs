// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const IoniconsScripts = () => (
//   <>
//     <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
//     <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
//   </>
// );

// const PersonInfoInsert: React.FC = () => {

//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     // Handle form submission logic here
//     navigate('/');
//   };

//   return (
//     <>
//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: 'Poppins', sans-serif;
//         }

//         section {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           width: 100%;
//           height: 100vh;
//           background: url('https://www.thinkupthemes.com/blog/wp-content/uploads/2021/10/best-library-wordpress-themes.jpg') no-repeat;
//           background-size: cover;
//           background-position: center;
//         }

//         .box {
//           position: relative;
//           width: 400px;
//           height: 450px;
//           background: transparent;
//           border-radius: 20px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           backdrop-filter: blur(15px);
//         }

//         .person-box {
//           height: 580px; /* Tăng chiều cao nếu cần */
//         }

//         h2 {
//           font-size: 2em;
//           color: #fff;
//           text-align: center;
//           font-weight: bold;
//         }

//         .input-box {
//           position: relative;
//           width: 310px;
//           margin: 30px 0;
//           border-bottom: 2px solid #fff;
//         }

//         .input-box .icon {
//           position: absolute;
//           right: 8px;
//           color: #fff;
//           font-size: 1.2em;
//           line-height: 57px;
//         }

//         .input-box label {
//           position: absolute;
//           top: 50%;
//           left: 5px;
//           transform: translateY(-50%);
//           font-size: 1em;
//           color: #fff;
//           pointer-events: none;
//           transition: .5s;
//         }

//         .input-box input:focus ~ label,
//         .input-box input:valid ~ label {
//           top: -5px;
//         }

//         .input-box input {
//           width: 100%;
//           height: 50px;
//           background: transparent;
//           border: none;
//           outline: none;
//           font-size: 1em;
//           color: #fff;
//           padding: 0 35px 0 5px;
//         }

//         /* Đặc biệt: Tắt hiệu ứng label trôi nổi cho input date */
//         .input-box.date-input label {
//           position: static;
//           transform: none;
//           color: #fff;
//           font-size: 1em;
//           margin-bottom: 8px;
//           display: block;
//           pointer-events: auto;
//         }

//         .input-box.date-input input {
//           padding-left: 5px;
//         }

//         .input-box.date-input {
//           border-bottom: 2px solid #fff;
//           padding-top: 20px;
//         }

//         .gender-selection {
//           margin: 10px 0 20px;
//           font-size: .9em;
//           color: #fff;
//           display: flex;
//           justify-content: flex-start;
//           align-items: center;
//           gap: 20px;
//           width: 310px;
//         }

//         .gender-selection label {
//           display: flex;
//           align-items: center;
//           cursor: pointer;
//         }

//         .gender-selection label input {
//           margin-right: 5px;
//         }

//         button {
//           width: 100%;
//           height: 40px;
//           background: #fff;
//           border: none;
//           outline: none;
//           border-radius: 40px;
//           cursor: pointer;
//           font-size: 1em;
//           color: #000;
//           font-weight: 500;
//         }

//         @media (max-width: 360px) {
//           .box {
//             width: 100%;
//             height: 100vh;
//             border: none;
//             border-radius: 0;
//           }

//           .input-box, .gender-selection {
//             width: 290px;
//           }
//         }
//       `}</style>

//       <section>
//         <div className="box person-box">
//           <form>
//             <h2>Thông tin cá nhân</h2>

//             {/* Họ và tên */}
//             <div className="input-box">
//               <span className="icon"><ion-icon name="person"></ion-icon></span>
//               <input type="text" required />
//               <label>Họ và tên</label>
//             </div>

//             {/* Ngày sinh - ĐÃ SỬA: label không trôi nổi */}
//             <div className="input-box date-input">
//               <span className="icon"><ion-icon name="calendar"></ion-icon></span>
//               <label>Ngày sinh</label>
//               <input type="date" required style={{ color: '#fff' }} />
//             </div>

//             {/* Số điện thoại */}
//             <div className="input-box">
//               <span className="icon"><ion-icon name="call"></ion-icon></span>
//               <input 
//                 type="text" 
//                 required 
//                 pattern="[0-9]*"
//                 inputMode="numeric"
//                 onKeyPress={(e) => {
//                   if (!/[0-9]/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }} 
//               />
//               <label>Số điện thoại</label>
//             </div>

//             {/* Địa chỉ */}
//             <div className="input-box">
//               <span className="icon"><ion-icon name="location"></ion-icon></span>
//               <input type="text" required />
//               <label>Địa chỉ</label>
//             </div>

//             {/* Giới tính */}
//             <div className="gender-selection">
//               <span style={{ marginRight: '10px' }}>Giới tính:</span>
//               <label><input type="radio" name="gender" value="male" /> Nam</label>
//               <label><input type="radio" name="gender" value="female" /> Nữ</label>
//             </div>

//             <button type="button" onClick={handleSubmit}>Đăng ký</button>
//           </form>
//         </div>
//       </section>

//       <IoniconsScripts />
//     </>
//   );
// };

// export default PersonInfoInsert;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IoniconsScripts = () => (
  <>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </>
);

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
      const token = localStorage.getItem("token");
      if (!token) {
        return "Vui long dang nhap";
      }
      console.log("BẮT ĐẦU GỬI FETCH", formData);
      const res = await fetch("http://localhost:3001/api/auth/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(formData),
      });
      // const data = await res.json();
      const data = await res.json();
      if (!res.ok) {
        alert('Lỗi: ' + (data.message || 'Không gửi được dữ liệu'));
        return;
      }

      alert(data.message || 'Cập nhật thành công!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi gửi dữ liệu.');
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

        .person-box {
          height: 580px; /* Tăng chiều cao nếu cần */
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

        /* Đặc biệt: Tắt hiệu ứng label trôi nổi cho input date */
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
              <span className="icon"><ion-icon name="calendar"></ion-icon></span>
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

            <button type="button" onClick={handleSubmit}>Đăng ký</button>
          </form>
        </div>
      </section>

      <IoniconsScripts />
    </>
  );
};

export default PersonInfoInsert; 