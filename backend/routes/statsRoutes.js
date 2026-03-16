const express = require("express");
const DailyLog = require("../models/DailyLog");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:userId",authMiddleware, async (req, res) => {

  try {

    const logs = await DailyLog.find({
      userId: req.params.userId
    }).sort({ date: 1 });

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let relapseCount = 0;
    let cleanDays = 0;

    for (let log of logs) {

      if (log.status === "clean") {
        tempStreak++;
        cleanDays++;
      } 
      else if (log.status === "trigger") {
        tempStreak++;
      }
      else {
        relapseCount++;
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 0;
      }

      longestStreak = Math.max(longestStreak, tempStreak);
    }

    currentStreak = tempStreak;

    res.json({
      currentStreak,
      longestStreak,
      relapseCount,
      cleanDays
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;