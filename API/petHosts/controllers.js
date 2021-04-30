// Databases
const { PetHost, User, Review, HostImage } = require("../../db/models");

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
    req.body.userId = req.user.id;
    const newPetHost = await PetHost.create(req.body);
    res.status(201).json(newPetHost);
  } catch (err) {
    next(err);
  }
};

// Update Profile
exports.updatePetHost = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const host = await PetHost.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const updatedProfile = await host.update(req.body);
    res.json(updatedProfile);
  } catch (err) {
    next(err);
  }
};

// Delete Profile
exports.deletePetHost = async (req, res, next) => {
  try {
    const host = await PetHost.findOne({
      where: {
        userId: req.user.id,
      },
    });
    await host.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Average Rating
exports.averageReview = async (req, res, next) => {
  try {
    const host = await PetHost.findByPk(req.query.petHostId);

    const where = { where: { hostId: host.id } };
    const total = await Review.sum(`rating`, where);
    const count = await Review.count(where);

    const average = Math.round(total / count);
    res.json(average);
  } catch (err) {
    next(err.message);
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

// Create host location images
// Overview: there are two levels of async here:
// Top level for the function and for the forEach
// One the first level we assign an empty array which will be looped in the second level of async
// More expositation will be added later.
exports.addLocationImage = async (req, res, next) => {
  try {
    if (req.files) {
      let images = [];
      const host = await PetHost.findOne({
        where: {
          userId: req.user.id,
        },
      });
      req.files.forEach(async (file, i) => {
        images[i] = `http://${req.get("host")}/media/${file.filename}`;
        const hostimage = await HostImage.create({
          image: images[i],
          hostId: host.id,
        });
      });
      res.status(201).json({ images });
    }
  } catch (err) {
    next(err);
  }
};

exports.locationImagelist = async (req, res, next) => {
  try {
    const locationImages = await HostImage.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(locationImages);
  } catch (err) {
    next(err);
  }
};
