const mysql=require('mysql2');
require('dotenv').config();
module.exports=mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'struggle',
  database: 'lib',
});