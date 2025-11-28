const router = require("express").Router();
const messageController = require("../controllers/message.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.post("/", authenticate, messageController.create); 

module.exports = router;
