const router = require("express").Router();
const { Score } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const scoreData = await Score.findAll();

    if (!scoreData) {
      res.status(404).json({ error: 404, message: "Cannot find any Scores" });
      return;
    }

    res.status(200).json(scoreData);
  } catch (error) {
    res.status(400).json(err);
  }
});

//Retrieve score with an ID
router.get("/:id", async (req, res) => {
  try {
    const scoreData = await Score.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!scoreData) {
      res
        .status(404)
        .json({ error: 404, message: "Cannot find a Score with that id" });
      return;
    }

    res.status(200).json(scoreData);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const scoreData = await Score.create(req.body);

    //If successful
    if (!scoreData) {
      res.status(404).json({ error: 404, message: "Could not create Score" });
      return;
    }

    res.status(200).json(scoreData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update Route
router.put("/:id", async (req, res) => {
  try {
    const scoreData = await Score.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    //If successfuly updated
    if (!scoreData[0]) {
      res.status(404).json({ error: 404, message: "Could not update score" });
      return;
    }

    res.status(200).json(scoreData);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const scoreData = Score.destroy({
      where: {
        id: req.params.id,
      },
    });

    //If successfully deleted
    if (!scoreData) {
      res.status(404).json({ error: 404, message: "Could not delete score" });
      return;
    }

    res.status(200).json(scoreData);
  } catch (error) {
    res.status(400).json(err);
  }
});

module.exports = router;
