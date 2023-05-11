const router = require("express").Router();
const { User, Day, Log, Score, Medicine, Wellbeing } = require("../models");
const withAuth = require("../utils/auth");

//Gets all post in db and displays them
router.get("/", async (req, res) => {
  try {
    res.render("homepage", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

//dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {

    //Find most recent date of the user
    const mostRecentDay = await Day.findAll({
      limit: 1,
      where: {
        user_id: req.session.user_id,
      },
      order: [['date_created', 'desc']]
    });

    //Compare Dates 
    let getDate1 = new Date(mostRecentDay[0].date_created);
    let getDate2 = new Date();

    //If not the current day create a new Day database entry
    if (getDate1.toDateString() !== getDate2.toDateString()) {
      const newDate = await Day.create({
        checklist_complete : false,
        user_id : req.session.user_id
      })
    }

    const userData = await User.findOne({
      include: [
        {
          model: Day,
          include: [Score],
        },
        Log,
        Medicine,
        Wellbeing,
      ],
      where: {
        id: req.session.user_id,
      },
      order : [[Day, 'date_created', 'desc']]
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
    res.render("resources", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

//journals
router.get("/journals", async (req, res) => {
  try {
    res.render("journals", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/about", async (req, res) => {
  try {
    res.render("about", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    console.log(req.session.logged_in)
    res.render("signup");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
