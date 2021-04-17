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

module.exports = router;
