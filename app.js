const express = require("express");
const exphbs = require("express-handlebars");
require("./db/connect")
const passport = require("passport")
const session = require("express-session")
const flash = require("connect-flash");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth")
const errorHandling = require("./middleware/errorHandlingMW")

const app = express();

// passport config
require("./config/passport")(passport);

// body parse
app.use(express.urlencoded({ extended: false }));

// session
app.use(
    session({
        secret: process.env.SESSION_SEC,
        resave: true,
        saveUninitialized: true,
    })
);

// passport middleWare
app.use(passport.initialize());
app.use(passport.session());

// error handling
app.use(errorHandling)

// connect-flash
app.use(flash())

// glopal vrs
app.use((req, res, nxt) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.user
    nxt();
});

// application/json
app.use(express.json());

// static files
app.use(express.static("public"));

// Templating Engine
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use("/", authRoute)
app.use("/", userRoute)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The Server Listen In Port ${port}`));