const {Check_email , Register , UpdateDoc_gia} = require("../models/registerAccModel");
exports.regis = async (req,res) => {
   try{
    const {email , username , password , ho_ten , SDT , ngay_sinh , dia_chi} = req.body;

    if(!email || !username || !password || !ho_ten || !SDT || !ngay_sinh || !dia_chi){
        return res.status(400).json({message: "Thieu thong tin"})
    }

     const existing = await Check_email(email);
     if(existing.length > 0){
        return res.status(400).json({message: "Email da ton tai"})
     }

    const id_acc =  await Register(username , password , email);
     await UpdateDoc_gia (id_acc,ho_ten,SDT,ngay_sinh,dia_chi);
     res.status(200).json({message : "Dang ki thanh cong"})
   }
   catch
    (error) {
    console.error("Lỗi đăng ký:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
   
};