// Dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  createBooking,
  fetchBooking,
  updateBooking,
  deleteBooking,
  listBooking,
} = require("./controllers");

// Param Middleware
router.param("bookingId", async (req, res, next, bookingId) => {
  const booking = await fetchBooking(bookingId, next);
  if (booking) {
    req.booking = booking;
    next();
  } else {
    const err = new Error("Booking Not Found");
    err.status = 404;
    next(err);
  }
});

// Create Booking
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createBooking
);
// Update Booking
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateBooking
);
// Delete Booking
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteBooking
);
// List Bookings
router.get("/", listBooking);

module.exports = router;
