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
router.post("/createPetOwner", createPetOwner);
// Update Pet Owner
router.put("/:petOwnerId", updatePetOwner);
// Delete Pet Owner
router.delete("/:petOwnerId", deletePetOwner);
// list Pet Owners
router.get("/", listPetOwner);

module.exports = router;
