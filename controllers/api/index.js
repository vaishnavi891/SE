const router = require("express").Router();
const userRoutes = require("./userRoutes");
const calendarRoutes = require("./calendarRoutes");
const scoreRoutes = require("./scoreRoutes");
const dayRoutes = require("./dayRoutes");
const logRoutes = require("./logRoutes");

router.use("/users", userRoutes);
router.use("/calendars", calendarRoutes);
router.use("/scores", scoreRoutes);
router.use("/days", dayRoutes);
router.use("/logs", logRoutes);



module.exports = router;

