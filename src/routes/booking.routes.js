const router = require("express").Router();
const bookingController = require("../controllers/booking.controller");
const { authenticate } = require("../middlewares/auth.middleware");


router.get("/", authenticate, bookingController.index);
router.post("/", authenticate, bookingController.create);
router.put("/:id", authenticate, bookingController.update);
router.get('/servicem8', authenticate, bookingController.retrieveForms);

module.exports = router;
