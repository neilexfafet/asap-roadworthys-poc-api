const bookingService = require("../services/booking.service");
const vehicleService = require("../services/vehicle.service");
const servicem8Service = require("../services/servicem8.service");

exports.index = async (req, res) => {
  try {
    const { user: authUser } = req;
    let bookings;

    if (authUser.role === "admin") {
      bookings = await bookingService.fetchBookings();
    } else {
      bookings = await bookingService.fetchBookingsByUser(authUser.id);
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    // 1. Create booking without the reference
    const vehicleData = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
    };
    const createdVehicle = await vehicleService.createVehicle(vehicleData);
    const initialBookingData = {
      description: req.body.description,
      service_type: req.body.service_type,
      user_id: req.user.id,
      vehicle_id: createdVehicle.id,
      status: 'In Progress'
    };
    const newBooking = await bookingService.createBooking(initialBookingData);

    // 2. Update booking with the new reference
    const reference = `BK-${String(newBooking.id).padStart(5, '0')}`;
    const updatedBooking = await bookingService.updateBooking(newBooking.id, { reference });
    res.status(201).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await bookingService.updateBooking(id, req.body);
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.findBookingById(id);
    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.retrieveForms = async (req, res) => {
  try {
    const servicem8 = await servicem8Service.retrieveForms();
    res.status(200).json(servicem8);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}