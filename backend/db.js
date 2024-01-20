var mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Abh1@bh1', // add password
    database: 'techtrek24',
    connectionLimit: 10, // Adjust as needed
  });
  
module.exports = pool;
