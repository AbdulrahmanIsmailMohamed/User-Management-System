const co = require("../db/connect");
const moment = require("moment")
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = require("express").Router();

// register
router.get("/register", (req, res) => {
    res.render("register")
});
router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.render('register', { errors });
    } else {
        const query = ` SELECT * FROM auth WHERE email = ?;`
        co.query(query, [email], (err, row) => {
            if (err) throw err;
            if (row == "") {
                var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                const query = `INSERT INTO auth SET name = ?, email = ?, password = ?, date = ?;`
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        const value = [name, email, hash, mysqlTimestamp]
                        co.query(query, value, (err) => {
                            if (err) throw err;
                        });
                    });
                });
                req.flash("success_msg", "You are now registered and can login :)")
                res.redirect("/login")
            } else {
                errors.push({ msg: 'Email already exists' });
                res.render("register", { errors })
            }
        });
    }
});


// login
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res, nxt) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        failureMessage: true
    },)(req, res, nxt);
});

// logout
router.get("/logout", (req, res) => {
    req.logout((err) => { if (err != undefined) console.log(err) });
    req.flash("success_msg","you are now logout");
    res.redirect('/login');
});

module.exports = router;