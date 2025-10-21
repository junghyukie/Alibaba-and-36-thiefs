// import React, { useState } from "react";
// import "./style.css";

// const Register: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [hoTen, setHoTen] = useState("");
//   const [SDT, setSdt] = useState("");
//   const [ngaySinh, setNgaySinh] = useState("");
//   const [diaChi, setDiaChi] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("Dữ liệu gửi đi:", {
//       email,
//       username,
//       password,
//       hoTen,
//       SDT,
//       ngaySinh,
//       diaChi,
//     });

//     try {
//       const res = await fetch("http://localhost:3001/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           username,
//           password,
//           ho_ten: hoTen,
//           SDT,
//           ngay_sinh: ngaySinh,
//           dia_chi: diaChi,
//         }),
//       });

//       const data = await res.json();
//       alert(data.message || "Đăng ký thành công!");
//     } catch (err) {
//       console.error("Lỗi đăng ký:", err);
//       alert("Không thể kết nối tới server!");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Đăng ký tài khoản</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Tên đăng nhập"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Mật khẩu"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Họ tên"
//           value={hoTen}
//           onChange={(e) => setHoTen(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Số điện thoại"
//           value={SDT}
//           onChange={(e) => setSdt(e.target.value)}
//         />``
//         <input
//           type="date"
//           placeholder="Ngày sinh"
//           value={ngaySinh}
//           onChange={(e) => setNgaySinh(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Địa chỉ"
//           value={diaChi}
//           onChange={(e) => setDiaChi(e.target.value)}
//         />
//         <button type="submit">Đăng ký</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOTP = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) setStep(2);
    } catch (err) {
      setMessage("Lỗi server");
    }
  };

  const handleReset = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ma_xac_thuc: otp,
          new_password: newPass,
        }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Lỗi server");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Quên mật khẩu</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleSendOTP} style={styles.button}>
              Gửi mã OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleReset} style={styles.button}>
              Đặt lại mật khẩu
            </button>
          </>
        )}

        {message && <p style={styles.msg}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
  },
  box: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  msg: {
    marginTop: "10px",
    color: "#333",
  },
};

