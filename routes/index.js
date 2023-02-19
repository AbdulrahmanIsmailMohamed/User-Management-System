const router = require("express").router()
const { ensureAuthenticated } = require("../config/auth");


// Dashboard
router.get('/dashboard', ensureAuthenticated,dashboard);

module.exports = router