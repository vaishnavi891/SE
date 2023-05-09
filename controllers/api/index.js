const router = require("express").Router();
const userRoutes = require("./userRoutes");
const calendarRoutes = require("./calendarRoutes");
const scoreRoutes = require("./scoreRoutes");
const dayRoutes = require("./dayRoutes");

router.use("/users", userRoutes);
router.use("/calendars", calendarRoutes);
router.use("/scores", scoreRoutes);
router.use("/days", dayRoutes);



module.exports = router;

