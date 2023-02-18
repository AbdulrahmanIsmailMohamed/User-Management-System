const router = require("express").Router();
const {
    view,
    search,
    form,
    adduser,
    edit,
    update
} = require("../controllers/userController");

router.route("/").get(view).post(search)

router.route("/adduser").get(form).post(adduser)

router.route("/updateuser/:id").get(edit).post(update)

module.exports = router;