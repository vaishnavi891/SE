const router = require("express").Router();
const { User, Day, Log, Score, Medicine, Wellbeing } = require("../models");
const withAuth = require("../utils/auth");

//Gets all post in db and displays them
router.get("/", withAuth, async (req, res) => {
  try {
    res.render("homepage", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

//login
router.get("/login", async (req, res) => {
  // If the user is already logged in, redirect the request to homepage
  if (req.session.logged_in) {
    res.redirect("/");
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

const avatarOptions = require("../utils/avatarOptions");

router.get("/signup", async (req, res) => {
  try {
    console.log(req.session.logged_in)
    res.render("signup", { avatarOptions });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add dashboard route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user and include related data
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Day,
          include: [
            {
              model: Score,
            },
          ],
        },
        {
          model: Log,
        },
        {
          model: Medicine,
        },
        {
          model: Wellbeing,
        },
      ],
      order: [[{ model: Day }, "date_created", "DESC"]],
    });

    const user = userData.get({ plain: true });

    // Get today's date string in YYYY-MM-DD format
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // Check if a Day record exists for today
    let currentDay = user.days.find(
      (day) => day.date_created && day.date_created.toISOString().startsWith(todayStr)
    );

    // If not, create a new Day record for today
    if (!currentDay) {
      const newDay = await Day.create({
        user_id: req.session.user_id,
        date_created: today,
        checklist_complete: false,
      });
      currentDay = newDay.get({ plain: true });
      // Add the new day to user's days array
      user.days.unshift(currentDay);
    }

    // Pass currentDay as the first day in days array for rendering
    user.days[0] = currentDay;

    res.render("dashboard", {
      userInfo: user,
      logged_in: true,
    });
  } catch (err) {
    console.error("Error in /dashboard route:", err);
    res.status(500).json(err);
  }
});
module.exports = router;
