const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    port : 3307,
    user : 'root',
    password : '123456',
    database : 'library_sys',

});

// let data =[]
// connection.query(
//     'select * from account',(err,results, fields) =>
// {    if(err){
//         console.error('Loi truy van',err);
//         return;
//     }
//     console.log(">>> results =" , results);
//     console.log(">>> fields = ",fields);
// }
// );

module.exports = connection;

