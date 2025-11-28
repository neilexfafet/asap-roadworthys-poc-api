const router = require("express").Router();

router.use("/auth", require('./auth.routes'));
router.use("/bookings", require("./booking.routes"));
router.use('/messages', require('./message.routes'));
router.use('/servicem8', require('./servicem8.routes'));

module.exports = router;
