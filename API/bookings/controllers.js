// Databases
const { Booking, User, PetOwner, PetHost, Pet } = require("../../db/models");

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
    const owner = await PetOwner.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const host = await User.findOne({
      where: {
        username: req.body.host,
      },
    });
    const pet = await Pet.findOne({
      where: {
        name: req.body.petName,
      },
    });
    const bookHost = await PetHost.findOne({
      where: {
        userId: host.id,
      },
    });
    if (bookHost && pet) {
      const newBooking = await Booking.create({
        ...req.body,
        hostId: bookHost.id,
        petId: pet.id,
        petOwnerId: owner.id,
      });
      res.status(201).json(newBooking);
    }
  } catch (err) {
    next(err);
  }
};

//Update Booking
exports.updateBooking = async (req, res, next) => {
  try {
    const owner = await User.findOne({
      where: {
        username: req.body.ownerUser,
      },
    });
    const ownerProfile = await PetOwner.findByPk(owner.id);

    const pet = await Pet.findOne({
      where: {
        name: req.body.petName,
        petOwnerId: ownerProfile.id,
      },
    });

    const booking = await Booking.findOne({
      where: { petId: pet.id },
    });
    const updatedBooking = await booking.update(req.body);
    res.json(updatedBooking);
  } catch (err) {
    next(err);
  }
};

//Delete Booking
exports.deleteBooking = async (req, res, next) => {
  try {
    const owner = await PetOwner.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const pet = await Pet.findOne({
      where: {
        name: req.body.petName,
        petOwnerId: owner.id,
      },
    });
    const booking = await Booking.findOne({
      where: { petId: pet.id },
    });
    await booking.destroy();
    res.status(204).end();
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
