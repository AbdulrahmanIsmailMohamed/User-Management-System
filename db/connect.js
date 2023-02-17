const mysql = require("mysql2");
require("dotenv").config();

// Connect With MySQL
const co = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_Name
});
co.connect((err) => {
    if (err) throw err;
    console.log("The DB Connected :)");
});

module.exports = co;
