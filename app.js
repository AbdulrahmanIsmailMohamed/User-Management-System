const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

require("dotenv").config();
const app = express();

// body parse
app.use(express.urlencoded({ extended: false }));

// application/json
app.use(express.json());

// static files
app.use(express.static("public"));

// Templating Engine
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

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


app.get("", (req, res) => {
    res.render("home");
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The Server Listen In Port ${port}`));