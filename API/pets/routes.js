// Dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  fetchPet,
  addPet,
  updatePet,
  deletePet,
  listPet,
} = require("./controllers");

// Param Middleware
router.param("petId", async (req, res, next, petId) => {
  const pet = await fetchPet(petId, next);
  if (pet) {
    req.pet = pet;
    next();
  } else {
    const err = new Error("Pet Not Found");
    err.status = 404;
    next(err);
  }
});
// Add Pet
router.post("/", passport.authenticate("jwt", { session: false }), addPet);
// Update Pet
router.put("/", passport.authenticate("jwt", { session: false }), updatePet);
// Delete Pet
router.delete("/", passport.authenticate("jwt", { session: false }), deletePet);
// List Pet
router.get("/", listPet);

module.exports = router;
