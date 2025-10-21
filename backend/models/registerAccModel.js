const connection = require("../config/db").promise();

const Check_email = async(email) => {
    const sql ="SELECT email from account where email = ?";
    const [rows] = await connection.query(sql ,[email]);
    return rows;
};


const Register = async(username , password , email) => {
    const sql = "INSERT INTO account(username , password_hash , email , trang_thai , id_role) values (? , ? , ? , 'ACTIVE' , 1)";
    const [rows] = await connection.query(sql , [username , password , email] );
    return rows.insertId;
}

const UpdateDoc_gia = async (id_acc,ho_ten ,SDT,ngay_sinh,dia_chi ) =>{
    const sql = "INSERT INTO doc_gia (id_account , ho_ten, SDT , ngay_sinh,dia_chi) values (?,?,?,?,?)";
    const [rows] = await connection.query(sql,[id_acc , ho_ten , SDT , ngay_sinh,dia_chi]);
}

module.exports = { Check_email, Register, UpdateDoc_gia };