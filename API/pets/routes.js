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
//add Pet
router.post("/addPet", addPet);
// update Pet
router.put("/:petId", updatePet);
// delete Pet
router.delete("/:petId", deletePet);
// List Pet
router.get("/", listPet);

module.exports = router;
