const { Booking } = require("../../db/models");

//fetch Booking
exports.fetchBooking = async (bookingId, next) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    return booking;
  } catch (err) {
    next(err);
  }
};

//Create Booking
exports.createBooking = async (req, res, next) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    next(err);
  }
};

//Update Booking
exports.updateBooking = async (req, res, next) => {
  try {
    await req.booking.update(req.body);
    res.status(204).json("Booking has been updated");
  } catch (err) {
    next(err);
  }
};

//Delete Booking
exports.deleteBooking = async (req, res, next) => {
  try {
    await req.booking.destroy();
    res.status(204).json("Booking has been deleted");
  } catch (err) {
    next(err);
  }
};

//List Booking
exports.listBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};
