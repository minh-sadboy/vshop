const mysql = require('mysql');
const con = mysql.createPool({
  connectionLimit : 20,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vshop2',
  multipleStatements: true
});
module.exports = con;


