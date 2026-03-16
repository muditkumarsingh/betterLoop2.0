const express = require("express");
const DailyLog = require("../models/DailyLog");
const authMiddleware = require("../middleware/authMiddleware");
const predictRisk = require("../services/riskPredictor");
const extractFeatures = require("../services/featureExtractor");
const UserRisk = require("../models/UserRisk");

const router = express.Router();


// CREATE DAILY LOG
router.post("/create", authMiddleware, async (req, res) => {

  try {

    const {
      status,
      trigger,
      notes,
      triggerType,
      urgeLevel,
      mood,
      completedPlan,
      logTime
    } = req.body;

    const userId = req.user.id;

    const today = new Date().toISOString().split("T")[0];

    const existingLog = await DailyLog.findOne({
      userId,
      date: today
    });

    if (existingLog) {
      return res.status(400).json({
        message: "Today's log already exists"
      });
    }

    const log = await DailyLog.create({
      userId,
      date: today,
      status,
      trigger,
      notes,

      // new ML fields
      triggerType,
      urgeLevel,
      mood,
      completedPlan,
      logTime
    });

    const features = await extractFeatures(userId);

    // Predict relapse risk
    const prediction = await predictRisk(features);

    // Save risk result
    await UserRisk.findOneAndUpdate(
      { userId },
      {
        riskScore: prediction.riskScore,
        riskLevel: prediction.riskLevel
      },
      { upsert: true, new: true }
    );
    
    res.json(log);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: error.message });

  }

});


// GET USER LOGS
router.get("/today", authMiddleware, async (req, res) => {

  try {

    const userId = req.user.id;

    const today = new Date().toISOString().split("T")[0];

    const log = await DailyLog.findOne({
      userId,
      date: today
    });

    res.json(log);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

router.get("/:userId", authMiddleware, async (req, res) => {

  try {

    const logs = await DailyLog.find({
      userId: req.params.userId
    }).sort({ date: 1 });
    

    res.json(logs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

//testing 


router.get("/features/test", authMiddleware, async (req, res) => {

  try {

    const features = await extractFeatures(req.user.id);

    res.json(features);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


router.get("/risk/test", authMiddleware, async (req, res) => {

  try {

    const features = await extractFeatures(req.user.id);

    const prediction = await predictRisk(features);

    res.json({
      features,
      prediction
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});
module.exports = router;