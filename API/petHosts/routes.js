// Dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  createPetHost,
  fetchPetHost,
  updatePetHost,
  deletePetHost,
  listPetHost,
} = require("./controllers");

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
  "/createPetHost",
  passport.authenticate("jwt", { session: false }),
  createPetHost
);
// Update Pet Host Profile
router.put(
  "/:petHostId",
  passport.authenticate("jwt", { session: false }),
  updatePetHost
);
// Delete Pet Host Profile
router.delete(
  "/:petHostId",
  passport.authenticate("jwt", { session: false }),
  deletePetHost
);
// List Pet Hosts
router.get("/", listPetHost);

module.exports = router;
