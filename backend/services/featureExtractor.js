const DailyLog = require("../models/DailyLog");

const extractFeatures = async (userId) => {

  // get last 10 logs
  const logs = await DailyLog.find({ userId })
    .sort({ date: -1 })
    .limit(10);

  if (logs.length === 0) {
    return {
      streak: 0,
      recentTriggers: 0,
      recentRelapses: 0,
      missedTasks: 0,
      avgUrgeLevel: 0
    };
  }

  let streak = 0;
  let recentTriggers = 0;
  let recentRelapses = 0;
  let missedTasks = 0;
  let urgeSum = 0;
  let urgeCount = 0;

  for (const log of logs) {

    // streak calculation
    if (log.status === "clean") {
      streak++;
    }

    if (log.status === "trigger") {
      recentTriggers++;
    }

    if (log.status === "relapse") {
      recentRelapses++;
    }

    if (log.completedPlan === false) {
      missedTasks++;
    }

    if (log.urgeLevel) {
      urgeSum += log.urgeLevel;
      urgeCount++;
    }
  }

  const avgUrgeLevel = urgeCount > 0 ? urgeSum / urgeCount : 0;

  return {
    streak,
    recentTriggers,
    recentRelapses,
    missedTasks,
    avgUrgeLevel
  };

};

module.exports = extractFeatures;