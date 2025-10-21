
const {Account , Lock} = require("../models/accountModel");

exports.login =  async (req, res) => {
  try{
    const {email,password}  = req.body;
    if(!email || !password) {
        return res.status(400).json({message: "Thieu thong tin"})
    }
  const accData = await Account(email);
  if(accData.length ===  0){
    return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }
  const acc = accData[0];
  if(acc.locked_until && new Date() < new Date(acc.locked_until)){
    return res.status(403).json({ message: "Tài khoản đang bị khóa, vui lòng thử lại sau." });
  }
  if(acc.password_hash != password){
    const fail = acc.failed_attempts + 1;
    if (fail >= 5) {
        const lock_until = new Date(Date.now() + 0.5 * 60 * 1000);
        await Lock(fail, lock_until , email);
      } else {
        await Lock(fail, null , email);
      }
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }
  else{
    await Lock(0, null , email);

    res.status(200).json({
      message: "Đăng nhập thành công",
      success : true,
      id_role : acc.id_role,
    });
  }
}
  catch(error){
    res.status(500).json({ message: "Lỗi server" });
  }
  };

  






