const router = require("express").Router();
const userRoutes = require("./userRoutes");
const scoreRoutes = require("./scoreRoutes");
const dayRoutes = require("./dayRoutes");
const logRoutes = require("./logRoutes");
const wellbeingRoutes = require("./wellbeingRoutes");
const medicineRoutes = require("./medicineRoutes");

router.use("/users", userRoutes);
router.use("/scores", scoreRoutes);
router.use("/days", dayRoutes);
router.use("/logs", logRoutes);
router.use("/wellbeings", wellbeingRoutes);
router.use("/medicines", medicineRoutes);

module.exports = router;
