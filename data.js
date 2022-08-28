const mysql=require('mysql2');
require('dotenv').config(); //connects to .env file to fetch sensitive data
module.exports=mysql.createConnection({
  host: process.env.MySQL_HOST,
  user: process.env.MySQL_USER,
  password: process.env.MySQL_PWD,
  database: process.env.MySQL_DB,
});