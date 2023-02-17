const co = require("../db/connect");

const view = (req, res) => {
    co.query("SELECT * FROM user;", (err, row) => {
        if (err) throw err;
        res.render("home", { row });
        console.log(row);
    })
}

const search = (req, res) => {
    const search = req.body.search;
    co.query(
        `SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?;`,
        [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`],
        (err, row) => {
            if (err) throw err;
            res.render("home", { row });
        }
    );
}

const form = (req, res) => {
    res.render("addUser");
}

const adduser = (req, res) => {
    const { first_name, last_name, email, phone, comment } = req.body;
    co.query(
        "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ?;",
        [first_name, last_name, email, phone, comment],
        (err) => {
            if (err) throw err;
            res.render("addUser", { alert: "User added successfully :)" });
        }
    )
}

module.exports = {
    view,
    search,
    form,
    adduser
}