const messageService = require('../services/message.service');

exports.create = async (req, res) => {
  try {
    const messageData = {
      booking_id: req.body.booking_id,
      sender: req.user.role,
      content: req.body.content,
    };
    const message = await messageService.create(messageData);
    
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.findBookingById(id);
    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};