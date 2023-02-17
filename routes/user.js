const router = require("express").Router();
const { view, search } = require("../controllers/userController");

router.get("/", view)
router.post("/", search)


module.exports = router;