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
  hostReviews,
  topReviews,
} = require("./controllers");
const { averageReview } = require("../petHosts/controllers");

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
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createReview
);
// Update Review
router.put("/", passport.authenticate("jwt", { session: false }), updateReview);
// Delete Review
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteReview
);
// List Reviews
router.get("/", listReview);
// List Host Reviews
router.get("/hostReviews", hostReviews);

// get avg review for a specific user
router.get("/averageReviews", averageReview);

// get top 4 hosts on reviews rating
router.get("/tophosts", topReviews);

module.exports = router;
