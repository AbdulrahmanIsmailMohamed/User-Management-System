const co = require("../db/connect");

const view = (req, res) => {
    co.query("SELECT * FROM user;", (err, row) => {
        if (err) throw err;
        res.render("home", { row });
        console.log(row);
    })
}

module.exports = {
    view
}