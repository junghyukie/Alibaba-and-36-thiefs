// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const UpdateUserForm: React.FC = () => {
// //   const [hoTen, setHoTen] = useState("");
// //   const [ngaySinh, setNgaySinh] = useState("");
// //   const [dienThoai, setDienThoai] = useState("");
// //   const [diaChi, setDiaChi] = useState("");
// //   const [gioiTinh, setGioiTinh] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();


// //     if (!hoTen || !ngaySinh || !dienThoai || !diaChi || !gioiTinh) {
// //       alert("Vui lòng điền đầy đủ thông tin!");
// //       return;
// //     }

// //     const formData = {
// //   ho_ten: hoTen,
// //   ngay_sinh: ngaySinh,
// //   dien_thoai: dienThoai,
// //   dia_chi: diaChi,
// //   gioi_tinh: gioiTinh,
// // };

// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         alert("Vui lòng đăng nhập trước khi cập nhật thông tin!");
// //         return;
// //       }

// //       console.log("📤 Gửi dữ liệu lên server:", formData);

// //       const res = await fetch("http://localhost:3001/api/auth/update-user", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         throw new Error(data.message || "Không gửi được dữ liệu lên server");
// //       }

// //       alert("Cập nhật thông tin thành công!");
// //       navigate("/");
// //     } catch (err: any) {
// //       console.error("❌ Lỗi khi gửi dữ liệu:", err);
// //       alert("Có lỗi xảy ra: " + (err.message || "Lỗi không xác định"));
// //     }


// //   };

// //   return (<div className="update-container" style={styles.container}> <h2>Cập nhật thông tin cá nhân</h2> <form onSubmit={handleSubmit} style={styles.form}>
// //     <input
// //       type="text"
// //       placeholder="Họ tên"
// //       value={hoTen}
// //       onChange={(e) => setHoTen(e.target.value)}
// //       required
// //       style={styles.input}
// //     />
// //     <input
// //       type="date"
// //       placeholder="Ngày sinh"
// //       value={ngaySinh}
// //       onChange={(e) => setNgaySinh(e.target.value)}
// //       required
// //       style={styles.input}
// //     />
// //     <input
// //       type="text"
// //       placeholder="Số điện thoại"
// //       value={dienThoai}
// //       onChange={(e) => setDienThoai(e.target.value)}
// //       required
// //       style={styles.input}
// //     />
// //     <input
// //       type="text"
// //       placeholder="Địa chỉ"
// //       value={diaChi}
// //       onChange={(e) => setDiaChi(e.target.value)}
// //       required
// //       style={styles.input}
// //     />
// //     <select
// //       value={gioiTinh}
// //       onChange={(e) => setGioiTinh(e.target.value)}
// //       required
// //       style={styles.input}
// //     > <option value="">-- Chọn giới tính --</option> <option value="Nam">Nam</option> <option value="Nữ">Nữ</option> <option value="Khác">Khác</option> </select> <button type="submit" style={styles.button}>
// //       Cập nhật </button> </form> </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     maxWidth: "400px",
// //     margin: "50px auto",
// //     padding: "20px",
// //     background: "#fff",
// //     borderRadius: "10px",
// //     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
// //     textAlign: "center",
// //   },
// //   form: {
// //     display: "flex",
// //     flexDirection: "column" as const,
// //   },
// //   input: {
// //     margin: "10px 0",
// //     padding: "10px",
// //     borderRadius: "5px",
// //     border: "1px solid #ccc",
// //   },
// //   button: {
// //     marginTop: "15px",
// //     padding: "10px",
// //     background: "#4CAF50",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "5px",
// //     cursor: "pointer",
// //   },
// // };

// // export default UpdateUserForm;



// // // import React, { useState } from "react";

// // // export default function ForgetPassword() {
// // //   const [step, setStep] = useState(1);
// // //   const [email, setEmail] = useState("");
// // //   const [otp, setOtp] = useState("");
// // //   const [newPass, setNewPass] = useState("");
// // //   const [message, setMessage] = useState("");

// // //   const handleSendOTP = async () => {
// // //     try {
// // //       const res = await fetch("http://localhost:3001/api/auth/forgot-password", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ email }),
// // //       });
// // //       const data = await res.json();
// // //       setMessage(data.message);
// // //       if (res.ok) setStep(2);
// // //     } catch (err) {
// // //       setMessage("Lỗi server");
// // //     }
// // //   };

// // //   const handleReset = async () => {
// // //     try {
// // //       const res = await fetch("http://localhost:3001/api/auth/reset-password", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           email,
// // //           ma_xac_thuc: otp,
// // //           new_password: newPass,
// // //         }),
// // //       });
// // //       const data = await res.json();
// // //       setMessage(data.message);
// // //     } catch (err) {
// // //       setMessage("Lỗi server");
// // //     }
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <div style={styles.box}>
// // //         <h2>Quên mật khẩu</h2>

// // //         {step === 1 && (
// // //           <>
// // //             <input
// // //               type="email"
// // //               placeholder="Nhập email"
// // //               value={email}
// // //               onChange={(e) => setEmail(e.target.value)}
// // //               style={styles.input}
// // //             />
// // //             <button onClick={handleSendOTP} style={styles.button}>
// // //               Gửi mã OTP
// // //             </button>
// // //           </>
// // //         )}

// // //         {step === 2 && (
// // //           <>
// // //             <input
// // //               type="text"
// // //               placeholder="Nhập mã OTP"
// // //               value={otp}
// // //               onChange={(e) => setOtp(e.target.value)}
// // //               style={styles.input}
// // //             />
// // //             <input
// // //               type="password"
// // //               placeholder="Mật khẩu mới"
// // //               value={newPass}
// // //               onChange={(e) => setNewPass(e.target.value)}
// // //               style={styles.input}
// // //             />
// // //             <button onClick={handleReset} style={styles.button}>
// // //               Đặt lại mật khẩu
// // //             </button>
// // //           </>
// // //         )}

// // //         {message && <p style={styles.msg}>{message}</p>}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   container: {
// // //     height: "100vh",
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     background: "#f0f2f5",
// // //   },
// // //   box: {
// // //     background: "#fff",
// // //     padding: "30px",
// // //     borderRadius: "10px",
// // //     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
// // //     width: "300px",
// // //     textAlign: "center",
// // //   },
// // //   input: {
// // //     width: "100%",
// // //     padding: "10px",
// // //     margin: "10px 0",
// // //     border: "1px solid #ccc",
// // //     borderRadius: "5px",
// // //   },
// // //   button: {
// // //     width: "100%",
// // //     padding: "10px",
// // //     background: "#4CAF50",
// // //     color: "white",
// // //     border: "none",
// // //     borderRadius: "5px",
// // //     cursor: "pointer",
// // //   },
// // //   msg: {
// // //     marginTop: "10px",
// // //     color: "#333",
// // //   },
// // // };

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

  

    const formData = {
      sach_id: Number(idSach),
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập trước khi mượn sách!");
        return;
      }

      console.log("📤 Gửi yêu cầu mượn sách:", formData);

      const res = await fetch("http://localhost:3001/user/service/reserve-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(res.ok){
        alert(data.message || "Đặt chỗ thành công")
      }
      else{
        alert(data.message || "Đặt chỗ thất bại")
      }
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


// //  import React, { useState } from "react";
// // //  import "./style.css";


// // const UpdateReturnDate: React.FC = () => {
// //   const [idMuon, setIdMuon] = useState("");
// //   const [idDocGia, setIdDocGia] = useState("");
// //   const [ngayTraThucTe, setNgayTraThucTe] = useState("");

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     console.log("Dữ liệu gửi đi:", {
// //       id_muon: idMuon,
// //       id_doc_gia: idDocGia,
// //       ngay_tra_thuc_te: ngayTraThucTe,
// //     });

// //     try {
// //       const res = await fetch("http://localhost:3001/api/borrowedcard/update-return", {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           id_muon: idMuon,
// //           id_doc_gia: Number(idDocGia),
// //           ngay_tra_thuc_te: ngayTraThucTe,
// //         }),
// //       });

// //       const data = await res.json();
// //       alert(data.message || "Cập nhật ngày trả thành công!");
// //     } catch (err) {
// //       console.error("Lỗi cập nhật:", err);
// //       alert("Không thể kết nối tới server!");
// //     }
// //   };

// //   return (
// //     <div className="register-container">
// //       <h2>Cập nhật ngày trả sách</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Mã mượn (id_muon)"
// //           value={idMuon}
// //           onChange={(e) => setIdMuon(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="number"
// //           placeholder="Mã độc giả (id_doc_gia)"
// //           value={idDocGia}
// //           onChange={(e) => setIdDocGia(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="date"
// //           placeholder="Ngày trả thực tế"
// //           value={ngayTraThucTe}
// //           onChange={(e) => setNgayTraThucTe(e.target.value)}
// //           required
// //         />
// //         <button type="submit">Cập nhật</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default UpdateReturnDate;

// import React from "react";

// const HistoryButton: React.FC = () => {
//   const handleClick = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("❌ Chưa đăng nhập, không có token!");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:3001/staff/service/late", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if(!res.ok) {
//         alert(data.message || "KO đủ quyền")
//       }
//     } catch (err) {
//       console.error("❌ Lỗi khi fetch lịch sử:", err);
//     }
//   };

//   return (
//     <div style={{ padding: "30px" }}>
//       <button
//         onClick={handleClick}
//         style={{
//           padding: "10px 20px",
//           background: "#4CAF50",
//           border: "none",
//           borderRadius: "5px",
//           color: "white",
//           cursor: "pointer",
//         }}
//       >
//         Gửi yêu cầu xem lịch sử
//       </button>
//     </div>
//   );
// };

// export default HistoryButton;

// import React, { useEffect, useState } from "react";

// const ListAccountPage: React.FC = () => {
//   const [accounts, setAccounts] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [message, setMessage] = useState("");

//   const fetchAccounts = async (currentPage: number) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("❌ Bạn chưa đăng nhập!");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:3001/staff/service/list-account?page=${currentPage}&pageSize=20`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "❌ Lỗi server");
//         return;
//       }

//       setAccounts(data.data);
//       setTotalPages(data.totalPages);
//       setMessage("");
//     } catch (err) {
//       console.error("❌ Lỗi fetch:", err);
//       alert("❌ Không thể kết nối server!");
//     }
//   };

//   useEffect(() => {
//     fetchAccounts(page);
//   }, [page]);

//   return (
//     <div style={styles.container}>
//       <h2>📄 Danh sách tài khoản</h2>

//       {message && <p style={styles.message}>{message}</p>}

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Họ tên</th>
//             <th>Vai trò</th>
//             <th>Giới hạn mượn</th>
//           </tr>
//         </thead>

//         <tbody>
//           {accounts.length > 0 ? (
//             accounts.map((acc, index) => (
//               <tr key={index}>
//                 <td>{acc.email}</td>
//                 <td>{acc.ho_ten}</td>
//                 <td>{acc.vai_tro}</td>
//                 <td>{acc.gioi_han_muon}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} style={{ textAlign: "center", padding: "15px" }}>
//                 Không có dữ liệu
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Phân trang */}
//       <div style={styles.pagination}>
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           style={styles.btn}
//         >
//           ◀ Trang trước
//         </button>

//         <span style={{ margin: "0 10px" }}>
//           Trang {page} / {totalPages}
//         </span>

//         <button
//           disabled={page >= totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           style={styles.btn}
//         >
//           Trang sau ▶
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ListAccountPage;

// const styles = {
//   container: {
//     maxWidth: "800px",
//     margin: "40px auto",
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     textAlign: "center" as const,
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse" as const,
//     marginTop: "20px",
//   },
//   message: {
//     color: "red",
//     fontWeight: "bold",
//   },
//   pagination: {
//     marginTop: "20px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btn: {
//     padding: "8px 15px",
//     border: "none",
//     background: "#4CAF50",
//     color: "white",
//     borderRadius: "5px",
//     cursor: "pointer",
//     margin: "0 5px",
//   },
// };
