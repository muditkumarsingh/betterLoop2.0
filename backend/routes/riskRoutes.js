const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const UserRisk = require("../models/UserRisk");

const router = express.Router();

router.get("/:userId", authMiddleware, async (req, res) => {

  try {

    const risk = await UserRisk.findOne({
      userId: req.params.userId
    });

    if (!risk) {
      return res.json({
        riskScore: 0,
        riskLevel: "unknown"
      });
    }

    res.json(risk);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;