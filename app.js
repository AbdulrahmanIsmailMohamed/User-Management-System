const express = require("express");
const exphbs = require("express-handlebars");
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

app.get("", (req, res) => {
    res.render("home");
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The Server Listen In Port ${port}`));