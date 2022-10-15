const mysql=require("mysql");
const connectiondb=()=>
{
    let connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"bbs",
    })
    return connection;
}
module.exports = connectiondb;