const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const co = require("../db/connect");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "email", passReqToCallback: true }, (req, email, password, done) => {
            // Match User
            const query = ` SELECT * FROM auth WHERE email = ?;`
            co.query(query, [email], (err, row) => {
                if (err) throw err;
                if (row == "") {
                    req.flash("error_msg", "That email isn't registered")
                    return done(null, false);
                }
                // Match Password
                const passwordUser = row[0].password;
                bcrypt.compare(password, passwordUser, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) return done(null, row[0].email);
                    req.flash("error_msg", "Password Incorrect!")
                    return done(null, false);
                });
            });
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((email, done) => {
        const query = `SELECT * FROM auth WHERE email = ?`;
        co.query(query, [email], (err, row) => {
            done(err, email);
        })
    });
}