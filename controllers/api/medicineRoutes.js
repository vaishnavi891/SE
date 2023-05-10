const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Medicine } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const MedicineData = await Medicine.findAll();

    if (!MedicineData) {
      res.status(404).json({ error: 404, message: "Cannot find any Medicine" });
      return;
    }

    res.status(200).json(MedicineData);
  } catch (error) {
    res.status(400).json(err);
  }
});

//Retrieve Medicine with an ID
router.get("/:id", async (req, res) => {
  try {
    const MedicineData = await Medicine.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!MedicineData) {
      res
        .status(404)
        .json({ error: 404, message: "Cannot find a Medicine with that id" });
      return;
    }

    res.status(200).json(MedicineData);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const MedicineData = await Medicine.create(req.body);

    //If successful
    if (!MedicineData) {
      res
        .status(404)
        .json({ error: 404, message: "Could not create Medicine" });
      return;
    }

    res.status(200).json(MedicineData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update Route
router.put("/:id", async (req, res) => {
  try {
    const MedicineData = await Medicine.update(
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
    if (!MedicineData[0]) {
      res
        .status(404)
        .json({ error: 404, message: "Could not update Medicine" });
      return;
    }

    res.status(200).json(MedicineData);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const MedicineData = Medicine.destroy({
      where: {
        id: req.params.id,
      },
    });

    //If successfully deleted
    if (!MedicineData) {
      res
        .status(404)
        .json({ error: 404, message: "Could not delete Medicine" });
      return;
    }

    res.status(200).json(MedicineData);
  } catch (error) {
    res.status(400).json(err);
  }
});

module.exports = router;
