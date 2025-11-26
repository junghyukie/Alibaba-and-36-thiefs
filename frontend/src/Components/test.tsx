// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UpdateUserForm: React.FC = () => {
//   const [hoTen, setHoTen] = useState("");
//   const [ngaySinh, setNgaySinh] = useState("");
//   const [dienThoai, setDienThoai] = useState("");
//   const [diaChi, setDiaChi] = useState("");
//   const [gioiTinh, setGioiTinh] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();


//     if (!hoTen || !ngaySinh || !dienThoai || !diaChi || !gioiTinh) {
//       alert("Vui lòng điền đầy đủ thông tin!");
//       return;
//     }

//     const formData = {
//   ho_ten: hoTen,
//   ngay_sinh: ngaySinh,
//   dien_thoai: dienThoai,
//   dia_chi: diaChi,
//   gioi_tinh: gioiTinh,
// };

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Vui lòng đăng nhập trước khi cập nhật thông tin!");
//         return;
//       }

//       console.log("📤 Gửi dữ liệu lên server:", formData);

//       const res = await fetch("http://localhost:3001/api/auth/update-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Không gửi được dữ liệu lên server");
//       }

//       alert("Cập nhật thông tin thành công!");
//       navigate("/");
//     } catch (err: any) {
//       console.error("❌ Lỗi khi gửi dữ liệu:", err);
//       alert("Có lỗi xảy ra: " + (err.message || "Lỗi không xác định"));
//     }


//   };

//   return (<div className="update-container" style={styles.container}> <h2>Cập nhật thông tin cá nhân</h2> <form onSubmit={handleSubmit} style={styles.form}>
//     <input
//       type="text"
//       placeholder="Họ tên"
//       value={hoTen}
//       onChange={(e) => setHoTen(e.target.value)}
//       required
//       style={styles.input}
//     />
//     <input
//       type="date"
//       placeholder="Ngày sinh"
//       value={ngaySinh}
//       onChange={(e) => setNgaySinh(e.target.value)}
//       required
//       style={styles.input}
//     />
//     <input
//       type="text"
//       placeholder="Số điện thoại"
//       value={dienThoai}
//       onChange={(e) => setDienThoai(e.target.value)}
//       required
//       style={styles.input}
//     />
//     <input
//       type="text"
//       placeholder="Địa chỉ"
//       value={diaChi}
//       onChange={(e) => setDiaChi(e.target.value)}
//       required
//       style={styles.input}
//     />
//     <select
//       value={gioiTinh}
//       onChange={(e) => setGioiTinh(e.target.value)}
//       required
//       style={styles.input}
//     > <option value="">-- Chọn giới tính --</option> <option value="Nam">Nam</option> <option value="Nữ">Nữ</option> <option value="Khác">Khác</option> </select> <button type="submit" style={styles.button}>
//       Cập nhật </button> </form> </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "50px auto",
//     padding: "20px",
//     background: "#fff",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     textAlign: "center",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column" as const,
//   },
//   input: {
//     margin: "10px 0",
//     padding: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     marginTop: "15px",
//     padding: "10px",
//     background: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default UpdateUserForm;



// // import React, { useState } from "react";

// // export default function ForgetPassword() {
// //   const [step, setStep] = useState(1);
// //   const [email, setEmail] = useState("");
// //   const [otp, setOtp] = useState("");
// //   const [newPass, setNewPass] = useState("");
// //   const [message, setMessage] = useState("");

// //   const handleSendOTP = async () => {
// //     try {
// //       const res = await fetch("http://localhost:3001/api/auth/forgot-password", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email }),
// //       });
// //       const data = await res.json();
// //       setMessage(data.message);
// //       if (res.ok) setStep(2);
// //     } catch (err) {
// //       setMessage("Lỗi server");
// //     }
// //   };

// //   const handleReset = async () => {
// //     try {
// //       const res = await fetch("http://localhost:3001/api/auth/reset-password", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           email,
// //           ma_xac_thuc: otp,
// //           new_password: newPass,
// //         }),
// //       });
// //       const data = await res.json();
// //       setMessage(data.message);
// //     } catch (err) {
// //       setMessage("Lỗi server");
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.box}>
// //         <h2>Quên mật khẩu</h2>

// //         {step === 1 && (
// //           <>
// //             <input
// //               type="email"
// //               placeholder="Nhập email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               style={styles.input}
// //             />
// //             <button onClick={handleSendOTP} style={styles.button}>
// //               Gửi mã OTP
// //             </button>
// //           </>
// //         )}

// //         {step === 2 && (
// //           <>
// //             <input
// //               type="text"
// //               placeholder="Nhập mã OTP"
// //               value={otp}
// //               onChange={(e) => setOtp(e.target.value)}
// //               style={styles.input}
// //             />
// //             <input
// //               type="password"
// //               placeholder="Mật khẩu mới"
// //               value={newPass}
// //               onChange={(e) => setNewPass(e.target.value)}
// //               style={styles.input}
// //             />
// //             <button onClick={handleReset} style={styles.button}>
// //               Đặt lại mật khẩu
// //             </button>
// //           </>
// //         )}

// //         {message && <p style={styles.msg}>{message}</p>}
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   container: {
// //     height: "100vh",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     background: "#f0f2f5",
// //   },
// //   box: {
// //     background: "#fff",
// //     padding: "30px",
// //     borderRadius: "10px",
// //     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
// //     width: "300px",
// //     textAlign: "center",
// //   },
// //   input: {
// //     width: "100%",
// //     padding: "10px",
// //     margin: "10px 0",
// //     border: "1px solid #ccc",
// //     borderRadius: "5px",
// //   },
// //   button: {
// //     width: "100%",
// //     padding: "10px",
// //     background: "#4CAF50",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "5px",
// //     cursor: "pointer",
// //   },
// //   msg: {
// //     marginTop: "10px",
// //     color: "#333",
// //   },
// // };

import React, { useState } from "react";

const BorrowBookForm: React.FC = () => {
  const [idSach, setIdSach] = useState<number | "">("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idSach) {
      alert("Vui lòng nhập mã sách muốn mượn!");
      return;
    }

    // ✅ Tự động tạo ngày mượn và ngày hết hạn (1 tháng sau)
    const now = new Date();
    const ngayMuon = now.toISOString().split("T")[0];

    const ngayHetHan = new Date();
    ngayHetHan.setMonth(ngayHetHan.getMonth() + 1);
    const ngayHetHanStr = ngayHetHan.toISOString().split("T")[0];

    const formData = {
      id_sach: Number(idSach),
      so_luong: 1,
      ngay_muon: ngayMuon,
      ngay_het_han: ngayHetHanStr,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập trước khi mượn sách!");
        return;
      }

      console.log("📤 Gửi yêu cầu mượn sách:", formData);

      const res = await fetch("http://localhost:3001/user/service/borrow-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Không thể mượn sách");
      }

      setMessage("✅ Mượn sách thành công!");
    } catch (err: any) {
      console.error("❌ Lỗi khi gửi dữ liệu:", err);
      setMessage("❌ Có lỗi xảy ra: " + (err.message || "Lỗi không xác định"));
    }
  };

  return (
    <div className="borrow-container" style={styles.container}>
      <h2>📚 Đăng ký mượn sách</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="Nhập mã sách (id_sach)"
          value={idSach}
          onChange={(e) => setIdSach(e.target.value ? Number(e.target.value) : "")}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Mượn sách
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    color: "#333",
  },
};

export default BorrowBookForm;


//  import React, { useState } from "react";
// //  import "./style.css";


// const UpdateReturnDate: React.FC = () => {
//   const [idMuon, setIdMuon] = useState("");
//   const [idDocGia, setIdDocGia] = useState("");
//   const [ngayTraThucTe, setNgayTraThucTe] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("Dữ liệu gửi đi:", {
//       id_muon: idMuon,
//       id_doc_gia: idDocGia,
//       ngay_tra_thuc_te: ngayTraThucTe,
//     });

//     try {
//       const res = await fetch("http://localhost:3001/api/borrowedcard/update-return", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           id_muon: idMuon,
//           id_doc_gia: Number(idDocGia),
//           ngay_tra_thuc_te: ngayTraThucTe,
//         }),
//       });

//       const data = await res.json();
//       alert(data.message || "Cập nhật ngày trả thành công!");
//     } catch (err) {
//       console.error("Lỗi cập nhật:", err);
//       alert("Không thể kết nối tới server!");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Cập nhật ngày trả sách</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Mã mượn (id_muon)"
//           value={idMuon}
//           onChange={(e) => setIdMuon(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Mã độc giả (id_doc_gia)"
//           value={idDocGia}
//           onChange={(e) => setIdDocGia(e.target.value)}
//           required
//         />
//         <input
//           type="date"
//           placeholder="Ngày trả thực tế"
//           value={ngayTraThucTe}
//           onChange={(e) => setNgayTraThucTe(e.target.value)}
//           required
//         />
//         <button type="submit">Cập nhật</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateReturnDate;