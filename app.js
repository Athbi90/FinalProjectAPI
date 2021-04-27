// Dependancies
const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const ip = require("ip");
require("dotenv").config();
const morgan = require("morgan");
// Socket.io stuff
// const httpServer = require("http").createServer(app);
// const io = require("socket.io")(httpServer, options);

// Initialize app
const app = express();

// Importing routes
const userRoutes = require("./API/users/routes");
const bookingRoutes = require("./API/bookings/routes");
const reviewRoutes = require("./API/reviews/routes");

// Passport Strategies
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// Importing database
const db = require("./db/models");

// Middleware
// app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media"))); // Media

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Using routes
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/reviews", reviewRoutes);

// Socket.io connection
// io.on("connection", socket => { /* ... */ });

// Handling Errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

// Message
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

// Start server
const run = async () => {
  try {
    await db.sequelize.sync({ alter: false });
    console.log("Server connected to database successfully.");

    app.listen(process.env.PORT, () => {
      console.log("Express app started successfully");
      console.log(`Running on ${ip.address()}:${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to database:", error);
  }
};
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});
run();
