// Dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  createReview,
  fetchReview,
  updateReview,
  deleteReview,
  listReview,
} = require("./controllers");

// PetHost Controllers
const { fetchPetHost } = require("../petHosts/controllers");

// Param middleware
router.param("petHostId", async (req, res, next, petHostId) => {
  const petHost = await fetchPetHost(petHostId, next);
  if (petHost) {
    req.petHost = petHost;
    next();
  } else {
    const err = new Error("Pet Host Not Found");
    err.status = 404;
    next(err);
  }
});
// Param Middleware
router.param("reviewId", async (req, res, next, reviewId) => {
  const review = await fetchReview(reviewId, next);
  if (review) {
    req.review = review;
    next();
  } else {
    const err = new Error("Review Not Found");
    err.status = 404;
    next(err);
  }
});

// Create Review
router.post("/:petHostId/createReview", createReview);
// Update Review
router.put("/:reviewId", updateReview);
// Delete Review
router.delete("/:reviewId", deleteReview);
// List Reviews
router.get("/", listReview);

module.exports = router;
