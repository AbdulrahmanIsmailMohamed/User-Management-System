const co = require("../db/connect");

const view = (req, res) => {
    const query = "SELECT * FROM user WHERE status = 'active';";
    co.query(query, (err, row) => {
        if (err) throw err;
        res.render("home", { row });
    })
}

const search = (req, res) => {
    const search = req.body.search;
    const query = `SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?;`;
    const value = [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`];
    co.query(query, value, (err, row) => {
        if (err) throw err;
        res.render("home", { row });
    });
}

const form = (req, res) => {
    res.render("addUser");
}

const adduser = (req, res) => {
    const { first_name, last_name, email, phone, comment } = req.body;
    const query = "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ?;";
    const value = [first_name, last_name, email, phone, comment];
    co.query(query, value, (err) => {
        if (err) throw err;
        res.render("addUser", { alert: "User added successfully :)" });
    });
}

const edit = (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM user WHERE id = ?;`;
    const value = [id]
    co.query(query, value, (err, row) => {
        if (err) throw err;
        res.render("editUser", { row });
    });
}

const update = (req, res) => {
    const id = req.params.id
    const { first_name, last_name, email, phone, comment } = req.body;
    const query = `UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ? WHERE id = ?;`;
    const value = [first_name, last_name, email, phone, comment, id];
    co.query(query, value, (err, row) => {
        if (err) throw err;
        co.query(`SELECT * FROM user WHERE id = ${id};`, (err, row) => {
            if (err) throw err;
            res.render("editUser", { row, alert: `${first_name} has been updated` });
        });
    });
}

const hideUser = (req, res) => {
    const id = req.params.id
    const query = "UPDATE user SET status = 'removed' WHERE id = ?;"
    co.query(query, id, (err) => {
        if (err) throw err;
        res.redirect('/');
    });
}

const viewUser = (req, res) => {
    const id = req.params.id
    const query = "SELECT * FROM user WHERE id = ?"
    co.query(query, id, (err, row) => {
        if (err) throw err;
        res.render("viewUser", { row })
    })
}

module.exports = {
    view,
    search,
    form,
    adduser,
    edit,
    update,
    hideUser,
    viewUser
}