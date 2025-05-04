const router = require("express").Router();

const userRoutes = require("./userRoutes");
const scoreRoutes = require("./scoreRoutes");
const dayRoutes = require("./dayRoutes");
const logRoutes = require("./logRoutes");
const wellbeingRoutes = require("./wellbeingRoutes");
const medicineRoutes = require("./medicineRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const debugRoutes = require("./debugRoutes");

// Route mounting
router.use("/users", userRoutes);
router.use("/scores", scoreRoutes);
router.use("/days", dayRoutes);
router.use("/logs", logRoutes);
router.use("/habits", wellbeingRoutes);
router.use("/medications", medicineRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/debug", debugRoutes);

module.exports = router;
