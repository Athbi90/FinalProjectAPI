// Databases
const { PetOwner, User, Pet } = require("../../db/models");

// Include Convention
const includeOptions = {
  attributes: { exclude: ["createdAt", "updatedAt"] },
  include: [
    {
      model: Pet,
      as: "pet",
      attributes: ["id"],
    },
    // {
    //   model: User,
    //   as: "user",
    //   attributes: ["id"],
    // },
  ],
};

// Fetch Pet Owner
exports.fetchPetOwner = async (petOwnerId, next) => {
  try {
    const petOwner = await PetOwner.findByPk(petOwnerId, includeOptions);
    return petOwner;
  } catch (err) {
    next(err);
  }
};

// Create Pet Owner Profile
exports.createPetOwner = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const newPetOwner = await PetOwner.create(req.body);
    res.status(201).json(newPetOwner);
  } catch (err) {
    next(err);
  }
};

// Update Profile
exports.updatePetOwner = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("owner")}/media/${req.file.filename}`;
    }
    const petOwner = await PetOwner.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const updatedProfile = await petOwner.update(req.body);
    res.json(updatedProfile);
  } catch (err) {
    next(err);
  }
};

// Delete Profile
exports.deletePetOwner = async (req, res, next) => {
  try {
    const petOwner = await PetOwner.findOne({
      where: {
        userId: req.user.id,
      },
    });
    await petOwner.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// List Owner Profile
exports.listPetOwner = async (req, res, next) => {
  try {
    const petOwners = await PetOwner.findAll(includeOptions);
    res.json(petOwners);
  } catch (err) {
    next(err);
  }
};
