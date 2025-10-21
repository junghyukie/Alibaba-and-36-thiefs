const {existing_email , updateOTP , checkOTP , resetPass} = require("../models/forgetPasswdModel");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.forget = async(req,res) => {
    try{
        const {email} = req.body;
        const existing = await existing_email(email);
        if(existing.length > 0){
            const data = existing[0];
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const expireTime = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
            const update = await updateOTP(code,expireTime,data.email);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {user: 'pvviet2005@gmail.com', pass: 'neujuggavnpkpsnr' } // 
            });
            try{
                await transporter.sendMail({
                from: 'pvviet2005@gmail.com',
                to: email,
                subject: 'Mã xác thực đổi mật khẩu',
                text: `Mã xác thực của bạn là: ${code}. Mã có hiệu lực trong 5 phút.`
                 
            });
            res.status(200).json({ message: "Đã gửi mã OTP đến email" });
            }catch(err){
                res.status(500).json({ message: "Không thể gửi email" });
            }
            
        }
        else{
            return res.status(400).json({message : "Email khong ton tai"})
        }
    }catch
    (error) {
    console.error("Lỗi gui mail:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}

exports.resetPassword = async(req,res) =>{
    try{
        const {ma_xac_thuc, new_password , email} = req.body;
        const otp = await checkOTP(ma_xac_thuc,email); // email xem dung dc khong
        if(otp.length > 0) {
            const reset = await resetPass(new_password , email);
            res.status(200).json({message : "Doi mat khau thanh cong"});
        }
        else{
            res.status(400).json({message : "OTP khong chinh xac hoac da het han"});
        }
    }catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
    
};