// Database
const { Pet, User, PetOwner } = require("../../db/models");

// Fetch Pet
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
    const owner = await PetOwner.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const newPet = await Pet.create({ ...req.body, petOwnerId: owner.id });
    res.status(201).json({ message: "new Pet has been added" });
  } catch (err) {
    next(err);
  }
};

// Update Pet
exports.updatePet = async (req, res, next) => {
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
    await pet.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Delete Pet
exports.deletePet = async (req, res, next) => {
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

    await pet.destroy();
    res.status(204).end();
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
