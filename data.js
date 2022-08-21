const mysql=require('mysql');
require('dotenv').config();
module.exports=mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PWD,
    database : process.env.DB,
    port : process.env.PORT,
  });