const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Wellbeing } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const wellbeingData = await Wellbeing.findAll();

    if (!wellbeingData) {
      res
        .status(404)
        .json({ error: 404, message: "Cannot find any Wellbeing" });
      return;
    }

    res.status(200).json(wellbeingData);
  } catch (error) {
    res.status(400).json(err);
  }
});

//Retrieve Wellbeing with an ID
router.get("/:id", async (req, res) => {
  try {
    const wellbeingData = await Wellbeing.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!wellbeingData) {
      res
        .status(404)
        .json({ error: 404, message: "Cannot find a Wellbeing with that id" });
      return;
    }

    res.status(200).json(wellbeingData);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const wellbeingData = await Wellbeing.create(req.body);

    //If successful
    if (!wellbeingData) {
      res
        .status(404)
        .json({ error: 404, message: "Could not create Wellbeing" });
      return;
    }

    res.status(200).json(wellbeingData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update Route
router.put("/:id", async (req, res) => {
  try {
    const wellbeingData = await Wellbeing.update(
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
    if (!wellbeingData[0]) {
      res
        .status(404)
        .json({ error: 404, message: "Could not update Wellbeing" });
      return;
    }

    res.status(200).json(wellbeingData);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const wellbeingData = Wellbeing.destroy({
      where: {
        id: req.params.id,
      },
    });

    //If successfully deleted
    if (!wellbeingData) {
      res
        .status(404)
        .json({ error: 404, message: "Could not delete Wellbeing" });
      return;
    }

    res.status(200).json(wellbeingData);
  } catch (error) {
    res.status(400).json(err);
  }
});

module.exports = router;
