const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Score, Day } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dayData = await Day.findAll({ include: [Score] });
    if (!dayData) {
      res.status(404).json({ error: 404, message: "Cannot find any Day" });
      return;
    }

    res.status(200).json(dayData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dayData = await Day.findOne({
      where: {
        id: req.params.id,
      },
      include: [Score],
    });
    if (!dayData) {
      res.status(404).json({ error: 404, message: "Cannot find any Day" });
      return;
    }
    res.status(200).json(dayData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const dayData = await Day.create(req.body);

    if (!dayData) {
      res.status(404).json({ error: 404, message: "Could not create Day" });
      return;
    }

    res.status(200).json(dayData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update Route
router.put("/:id", async (req, res) => {
  try {
    const dayData = await Day.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    //If successfully updated
    if (!dayData[0]) {
      res
        .status(404)
        .json({ error: 404, message: "Could not update calendar" });
      return;
    }

    res.status(200).json(dayData);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dayData = Day.destroy({
      where: {
        id: req.params.id,
      },
    });

    //If successfully deleted
    if (!dayData) {
      res.status(404).json({ error: 404, message: "Could not delete Day" });
      return;
    }

    res.status(200).json(dayData);
  } catch (error) {
    res.status(400).json(err);
  }
});

module.exports = router;
