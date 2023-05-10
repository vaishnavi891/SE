const router = require("express").Router();
const { User, Day, Log, Score, Medicine, Wellbeing} = require("../models");
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
        Log,
        Medicine,
        Wellbeing
      ],
      where :{
        id : req.session.user_id
      }
    });
    //convert the Sequelize model instances to plain JavaScript objects (allows the use of handlebar)
    const userInfo = userData.get({ plain: true });

    console.log(userInfo);
    
    res.render("dashboard", {
      userInfo,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.get("/login", async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
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
