const express = require("express");
const RecoveryPlan = require("../models/RecoveryPlan");
const AddictionProfile = require("../models/AddictionProfile");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GENERATE PLAN
router.post("/generate/:userId", authMiddleware, async (req, res) => {

  try {

    const profile = await AddictionProfile.findOne({
      userId: req.params.userId
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    let planSteps = [];
    let goodHabit = "";

    // Simple rule-based plan
    if (profile.addictionType === "social media") {

      planSteps = [
        "Limit social media usage to 30 minutes per day",
        "Avoid phone usage after 10 PM",
        "Replace scrolling time with reading"
      ];

      goodHabit = "Read 10 pages of a book daily";

    } else if (profile.addictionType === "gaming") {

      planSteps = [
        "Restrict gaming to weekends",
        "Remove games from phone",
        "Replace gaming with outdoor activity"
      ];

      goodHabit = "30 minute daily walk";

    } else {

      planSteps = [
        "Avoid triggers",
        "Stay accountable",
        "Replace addiction time with a productive habit"
      ];

      goodHabit = "Daily journaling";
    }

    const plan = await RecoveryPlan.create({
      userId: req.params.userId,
      addictionType: profile.addictionType,
      planSteps,
      goodHabit
    });

    res.json(plan);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// GET USER PLAN
router.get("/:userId", authMiddleware, async (req, res) => {

  try {

    const plan = await RecoveryPlan.findOne({
      userId: req.params.userId
    });

    res.json(plan);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

// UPDATE DAY COMPLETION
router.patch("/day/:dayNumber", authMiddleware, async (req, res) => {

  console.log("SERVER TIME:", new Date());
  console.log("ISO DATE:", new Date().toISOString());
  console.log("LOCAL DATE:", new Date().toLocaleDateString("en-CA"));

  try {

    const dayNumber = parseInt(req.params.dayNumber);

    const plan = await RecoveryPlan.findOne({
      userId: req.user.id
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // FIXED LINE
    const today = new Date().toLocaleDateString("en-CA");

    // check if user already completed a day today
    const alreadyCompletedToday = plan.days.find(
      d => d.completedAt === today
    );

    if (alreadyCompletedToday) {
      return res.status(400).json({
        message: "You can only complete one plan day per real day"
      });
    }

    const day = plan.days.find(d => d.day === dayNumber);

    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    if (day.completed === true) {
      return res.status(400).json({
        message: "This day has already been marked completed"
      });
    }

    // sequential rule
    const nextIncompleteDay = plan.days.find(d => d.completed === false);

    if (!nextIncompleteDay || nextIncompleteDay.day !== dayNumber) {
      return res.status(400).json({
        message: "You must complete days sequentially"
      });
    }

    day.completed = true;
    day.completedAt = today;

    console.log("Server today:", today);

    await plan.save();

    res.json({
      message: "Day marked as completed",
      plan
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;