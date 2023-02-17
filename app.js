const express = require("express");
const exphbs = require("express-handlebars");
require("./db/connect")

const userRoute = require("./routes/user")
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

app.use("/",userRoute)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The Server Listen In Port ${port}`));