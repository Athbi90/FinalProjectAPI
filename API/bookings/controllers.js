const { Booking, User, PetOwner, PetHost } = require("../../db/models");

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
    const user = await User.findOne({
      where: {
        username: req.body.host,
      },
    });
    const petHost = await PetHost.findOne({
      where: {
        userId: user.id,
      },
    });
    if (petHost) {
      req.body.petOwnerId = req.petOwner.id;
      const newBooking = await Booking.create(req.body);
      newBooking.update({ petHostId: petHost.id });
      res.status(201).json(newBooking);
    }
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
