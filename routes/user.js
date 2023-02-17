const router = require("express").Router();
const { view } = require("../controllers/userController");

router.get("/",view)


module.exports = router;