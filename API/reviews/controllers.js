const { Review } = require("../../db/models");

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
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
};

// Update Review
exports.updateReview = async (req, res, next) => {
  try {
    await req.review.update(req.body);
    res.status(204).json({ message: "Review has been updated" });
  } catch (err) {
    next(err);
  }
};

// Delete Review
exports.deleteReview = async (req, res, next) => {
  try {
    await req.review.destroy();
    res.status(204).json({ message: "Review has been deleted" });
  } catch (err) {
    next(err);
  }
};

// List Reviews
exports.listReview = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};
