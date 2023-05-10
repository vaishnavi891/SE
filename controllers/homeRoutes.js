const router = require("express").Router();
const { User, Day, Calendar, Score } = require("../models");
const withAuth = require("../utils/auth");

//Gets all post in db and displays them
router.get("/", async (req, res) => {
  try {
    res.render("about");
  } catch (err) {
    res.status(400).json(err);
  }
});

//dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      include: [
        {
          model: Day,
          include: [Score],
        },
      ],
    });
    //convert the Sequelize model instances to plain JavaScript objects (allows the use of handlebar)
    const userInfo = userData.get({ plain: true });

    res.render("dashboard", {
      userInfo,
      loggedIn: req.session.loggedIn,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.get("/login", async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

//resources
router.get("/resources", async (req, res) => {
  try {
    res.render("resources");
  } catch (err) {
    res.status(400).json(err);
  }
});

//journals
router.get("/journals", async (req, res) => {
  try {
    res.render("journals");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/about", async (req, res) => {
  try {
    res.render("about");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
