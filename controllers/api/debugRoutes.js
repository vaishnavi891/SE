const router = require("express").Router();

// Temporary debug route to get current logged-in user ID from session
router.get("/current-user-id", (req, res) => {
  if (req.session && req.session.user_id) {
    res.status(200).json({ user_id: req.session.user_id });
  } else {
    res.status(401).json({ error: "User not logged in" });
  }
});

module.exports = router;
