const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    database: "career_portal",
    user: "root",
    password: "heslo"
});

module.exports = pool;
