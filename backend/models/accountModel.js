const connection = require("../config/db").promise();

const Account = async (email) =>{
    const sql = "SELECT username , password_hash , id_role , failed_attempts , locked_until FROM account where username = ?";
    const [rows] = await connection.query(sql,[email]);
    return rows;
};

const Lock = async (fail , lock_until , email) =>{
  const sql = "UPDATE account SET failed_attempts = ? , locked_until = ? where username = ?"
  const [rows] = await connection.query(sql,[fail,lock_until,email]);
  return rows
}
module.exports = {Account , Lock};
