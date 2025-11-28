const router = require("express").Router();
const servicem8Controller = require("../controllers/servicem8.controller");

router.get('/forms', servicem8Controller.retrieveForms);
router.get("/auth", servicem8Controller.auth);

module.exports = router;
