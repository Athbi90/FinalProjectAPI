const { Review, PetHost, PetOwner, User } = require("../../db/models");

// fetch Review
exports.fetchReview = async (reviewId, next) => {
  try {
    const review = await Review.findByPk(reviewId);
    return review;
  } catch (err) {
    next(err);
  }
};

// Create Review
exports.createReview = async (req, res, next) => {
  try {
    const reviewer = await PetOwner.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const host = await User.findOne({
      where: {
        username: req.body.host,
      },
    });
    const hostReview = await PetHost.findOne({
      where: {
        userId: host.id,
      },
    });
    const newReview = await Review.create({
      ...req.body,
      reviewerId: reviewer.id,
      hostId: hostReview.id,
    });
    console.log(newReview);
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
};

// Update Review
exports.updateReview = async (req, res, next) => {
  try {
    const reviewer = await PetOwner.findOne({
      where: {
        userId: req.user.id,
      },
    });

    const review = await Review.findOne({
      where: {
        reviewerId: reviewer.id,
        id: req.body.reviewId,
      },
    });
    await review.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Delete Review
exports.deleteReview = async (req, res, next) => {
  try {
    const reviewer = await PetOwner.findOne({
      where: {
        userId: req.user.id,
      },
    });

    const review = await Review.findOne({
      where: {
        reviewerId: reviewer.id,
        id: req.body.reviewId,
      },
    });
    await review.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// List Reviews
exports.listReview = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "reviewerId", "id"] },
    });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// List Reviews for specific Host
exports.hostReviews = async (req, res, next) => {
  try {
    const hostUser = await User.findOne({
      where: { username: req.body.hostName },
    });
    const host = await PetHost.findOne({ where: { userId: hostUser.id } });
    const hostReview = await Review.findAll({
      where: { hostId: host.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "reviewerId", "hostId", "id"],
      },
    });
    res.json(hostReview);
  } catch (err) {
    next(err);
  }
};
