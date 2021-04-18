// Dependancies
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  signup,
  signin,
  fetchUser,
  userList,
  userUpdate,
  userDelete,
} = require("./controllers");

// Importing Routes
const petOwnerRoutes = require("../../API/petOwners/routes");
const petHostRoutes = require("../../API/petHosts/routes");

// Param Middleware
router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("User Not Found");
    err.status = 404;
    next(err);
  }
});

// Sign up "register"
router.post("/signup", signup);

// Sign in "register"
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
// user list
router.get("/", passport.authenticate("jwt", { session: false }), userList);

// Deleting Users
router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userDelete
);

// Updating Users
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userUpdate
);

//***Hiearchy */
// Pet Owner Routes
router.use("/:userId/petOwners", petOwnerRoutes);

// Pet Host Routes
router.use("/:userId/petHosts", petHostRoutes);

module.exports = router;
