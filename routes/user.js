const router = require("express").Router();
const {
    view,
    search,
    form,
    adduser
} = require("../controllers/userController");

router.route("/").get(view).post(search)

router.route("/adduser").get(form).post(adduser)

module.exports = router;