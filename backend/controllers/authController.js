// controllers/authController.js

const AuthService = require("../services/authService");


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.register = async (req, res) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    res.status(500).json({ message: error.message || "Lỗi server" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await AuthService.forgotPassword(email);
    res.status(200).json({ message: "Đã gửi mã OTP đến email" });
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, ma_xac_thuc, new_password } = req.body;
    await AuthService.resetPassword(email, ma_xac_thuc, new_password);
    res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
