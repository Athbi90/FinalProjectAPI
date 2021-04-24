// Dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");

// importing
const upload = require("../../middleware/multer");

// Controllers
const {
  createPetHost,
  fetchPetHost,
  updatePetHost,
  deletePetHost,
  listPetHost,
  averageReview,
  addLocationImage,
} = require("./controllers");

// Import Routers
const bookingRoutes = require("../../API/bookings/routes");

// Param middleware
router.param("petHostId", async (req, res, next, petHostId) => {
  const petHost = await fetchPetHost(petHostId, next);
  if (petHost) {
    req.petHost = petHost;
    next();
  } else {
    const err = new Error("Pet Host Not Found");
    err.status = 404;
    next(err);
  }
});

// Create Pet Host Profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createPetHost
);
// Update Pet Host Profile
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updatePetHost
);
// Delete Pet Host Profile
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  deletePetHost
);
// Average Review
router.get("/averageReviews", averageReview);

// List Pet Hosts
router.get("/", listPetHost);

// Add host location image
router.post(
  "/addLocationImage",
  passport.authenticate("jwt", { session: false }),
  upload.array("image"),
  addLocationImage
);

// *** Hiearchy ***/

// Booking Routes
router.use("/bookings", bookingRoutes);

module.exports = router;
