const { PetHost, User } = require("../../db/models");

// Fetch Pet Host
exports.fetchPetHost = async (petHostID, next) => {
  try {
    const petHost = await PetHost.findByPk(petHostID);
    return petHost;
  } catch (err) {
    next(err);
  }
};

// Create Pet Host Profile
exports.createPetHost = async (req, res, next) => {
  try {
    const newPetHost = await PetHost.create(req.body);
    res.status(201).json(newPetHost);
  } catch (err) {
    next(err);
  }
};

// Update Profile
exports.updatePetHost = async (req, res, next) => {
  try {
    await req.petHost.update(req.body);
    res.status(204).json("Profile has been updated").end();
  } catch (err) {
    next(err);
  }
};

// Delete Profile
exports.deletePetHost = async (req, res, next) => {
  try {
    await req.petHost.destroy();
    res.status(204).json("Profile has been deleted").end();
  } catch (err) {
    next(err);
  }
};
// List Profile
exports.listPetHost = async (req, res, next) => {
  try {
    const petHosts = await PetHost.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(petHosts);
  } catch (err) {
    next(err);
  }
};
