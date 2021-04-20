// Dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  createPetOwner,
  updatePetOwner,
  deletePetOwner,
  listPetOwner,
  fetchPetOwner,
} = require("./controllers");

// Importing Routes
const petRoutes = require("../../API/pets/routes");
const bookingRoutes = require("../../API/bookings/routes");
const reviewRoutes = require("../../API/reviews/routes");

// Param Middleware
router.param("petOwnerId", async (req, res, next, petOwnerId) => {
  const petOwner = await fetchPetOwner(petOwnerId, next);
  if (petOwner) {
    req.petOwner = petOwner;
    next();
  } else {
    const err = new Error("Pet Owner Not Found");
    err.status = 404;
    next(err);
  }
});

// Create Pet Owner Profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createPetOwner
);
// Update Pet Owner
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  updatePetOwner
);
// Delete Pet Owner
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deletePetOwner
);
// list Pet Owners
router.get("/", listPetOwner);

// *** Hiearchy ***/

// Pet Routes
router.use("/pets", petRoutes);
router.use("/bookings", bookingRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
