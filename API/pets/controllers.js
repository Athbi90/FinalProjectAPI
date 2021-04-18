const { Pet, User } = require("../../db/models");

//fetch Pet
exports.fetchPet = async (petId, next) => {
  try {
    const pet = await Pet.findByPk(petId);
    return pet;
  } catch (err) {
    next(err);
  }
};

// Add Pet
exports.addPet = async (req, res, next) => {
  try {
    req.body.petOwnerId = req.petOwner.id;
    const newPet = await Pet.create(req.body);
    res.status(201).json({ message: "new Pet has been added" });
  } catch (err) {
    next(err);
  }
};

// Update Pet
exports.updatePet = async (req, res, next) => {
  try {
    await req.pet.update(req.body);
    res.status(204).json("Pet infomation has been updated").end();
  } catch (err) {
    next(err);
  }
};

// Delete Pet
exports.deletePet = async (req, res, next) => {
  try {
    await req.pet.destroy();
    res.status(204).json("Pet has been deleted").end();
  } catch (err) {
    next(err);
  }
};

// Pet List
exports.listPet = async (req, res, next) => {
  try {
    const pets = await Pet.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      // include: {
      //   model: Room,
      //   as: "room",
      //   attributes: {
      //     include: ["id", "name"],
      //     exclude: ["createdAt", "updatedAt"],
      //     through: {
      //       attributes: [],
      //     },
      //   },
      // },
    });
    res.json(pets);
  } catch (err) {
    next(err);
  }
};
