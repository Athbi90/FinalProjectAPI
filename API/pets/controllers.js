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
    res.status(201).json(newPet);
  } catch (err) {
    next(err);
  }
};

// Update Pet
exports.updatePet = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    const owner = await PetOwner.findOne({
      where: {
        userId: req.user.id,
      },
    });

    const pet = await Pet.findOne({
      where: {
        name: req.body.oldPet,
        petOwnerId: owner.id,
      },
    });
    console.log(req.body);
    const updatedPet = await pet.update(req.body);
    res.json(updatedPet);
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
    });
    res.json(pets);
  } catch (err) {
    next(err);
  }
};
