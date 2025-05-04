const router = require("express").Router();
const { Score } = require("../../models");
const { Op } = require("sequelize");

// Route to get mood history for last 7 entries for a user (without timestamps)
router.get("/mood-history/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const scores = await Score.findAll({
      where: {
        day_id: userId,
      },
      order: [["id", "DESC"]],
      limit: 7,
    });

    // Use index as date labels since no timestamps
    const dates = scores.map((_, index) => `Entry ${index + 1}`).reverse();

    const moodScores = scores
      .map((score) => (score.mood !== undefined ? score.mood : 0))
      .reverse();

    res.json({ dates, scores: moodScores });
  } catch (error) {
    console.error("Error fetching mood history:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all scores
router.get("/", async (req, res) => {
  try {
    const scoreData = await Score.findAll();
    if (!scoreData) {
      return res.status(404).json({ error: 404, message: "No Scores found" });
    }
    res.status(200).json(scoreData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a score by ID
router.get("/:id", async (req, res) => {
  try {
    const scoreData = await Score.findOne({
      where: { id: req.params.id },
    });

    if (!scoreData) {
      return res.status(404).json({ error: 404, message: "Score not found" });
    }

    res.status(200).json(scoreData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new score
router.post("/", async (req, res) => {
  try {
    console.log("POST /api/scores body:", req.body);

    const { day_id, q1_value, q2_value, q3_value, q4_value } = req.body;

    if (
      day_id === undefined ||
      q1_value === undefined ||
      q2_value === undefined ||
      q3_value === undefined ||
      q4_value === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const mood = (q1_value + q2_value + q3_value + q4_value) / 4;

    const scoreData = await Score.create({
      day_id,
      q1_value,
      q2_value,
      q3_value,
      q4_value,
    });

    res.status(200).json(scoreData);
  } catch (error) {
    console.error("Error creating score:", error);
    res.status(400).json({ error: error.message });
  }
});

// Update a score by ID
router.put("/:id", async (req, res) => {
  try {
    const scoreData = await Score.update(
      { ...req.body },
      { where: { id: req.params.id } }
    );

    if (!scoreData[0]) {
      return res.status(404).json({ error: 404, message: "Update failed" });
    }

    res.status(200).json(scoreData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a score by ID
router.delete("/:id", async (req, res) => {
  try {
    const scoreData = await Score.destroy({
      where: { id: req.params.id },
    });

    if (!scoreData) {
      return res.status(404).json({ error: 404, message: "Delete failed" });
    }

    res.status(200).json({ message: "Score deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/summary/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const scores = await Score.findAll({
      where: { day_id: userId },
      order: [["id", "DESC"]],
      limit: 7,
    });

    if (!scores.length) {
      return res.status(404).json({ error: "No scores found" });
    }

    const moods = scores.map(score => (score.q1_value + score.q2_value + score.q3_value + score.q4_value) / 4);

    const averageMood = moods.reduce((a, b) => a + b, 0) / moods.length;
    const highestMood = Math.max(...moods);
    const lowestMood = Math.min(...moods);

    res.json({
      recentScores: scores,
      averageMood,
      highestMood,
      lowestMood,
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
