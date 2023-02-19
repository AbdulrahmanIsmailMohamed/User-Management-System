const router = require("express").Router();
const {
    view,
    search,
    form,
    adduser,
    edit,
    update,
    hideUser,
    viewUser
} = require("../controllers/userController");
const { ensureAuthenticated } = require("../config/auth");


router.route("/").get(ensureAuthenticated, view).post(ensureAuthenticated, search);

router.route("/adduser").get(ensureAuthenticated, form).post(ensureAuthenticated, adduser);

router.route("/updateuser/:id").get(ensureAuthenticated, edit).post(ensureAuthenticated, update);

router.get("/viewuser/:id", ensureAuthenticated, viewUser)

router.get("/:id", ensureAuthenticated, hideUser);

module.exports = router;