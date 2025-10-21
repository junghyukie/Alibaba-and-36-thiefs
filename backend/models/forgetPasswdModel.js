const connection = require("../config/db").promise();

const existing_email = async(email) => {
    const sql = 'SELECT email from account where email = ?';
    const [rows] = await connection.query(sql,[email]);
    return rows;
}

const updateOTP = async(ma_xac_thuc , token_expire , email) => {
    const sql = 'UPDATE account SET ma_xac_thuc = ? , token_expire = ? where email = ?'
    const [rows] = await connection.query(sql,[ma_xac_thuc,token_expire,email]);
}

const checkOTP = async (ma_xac_thuc ,  email) => {
    const sql = 'SELECT * from account where ma_xac_thuc = ? and email = ? and token_expire > NOW()';
    const [rows] = await connection.query(sql,[ma_xac_thuc,email]);
    return rows;
}

const resetPass = async(new_password,email) =>{
    const sql = 'UPDATE account SET password_hash = ? , ma_xac_thuc = null , token_expire = null where email = ?';
    const [rows] = await connection.query(sql,[new_password,email]);
}

module.exports = {existing_email , updateOTP , checkOTP,resetPass};