const express = require("express");
const AddictionProfile = require("../models/AddictionProfile");
const authMiddleware = require("../middleware/authMiddleware");
const generatePlan = require("../services/planGenerator");
const RecoveryPlan = require("../models/RecoveryPlan");

const router = express.Router();


// SAVE ASSESSMENT
// router.post("/create", authMiddleware, async (req, res) => {

//   try {

//     const profile = await AddictionProfile.create({
//       userId: req.user.id,
//       ...req.body
//     });

//     const existingPlan = await RecoveryPlan.findOne({
//       userId: req.user.id
//     });

//     if (existingPlan) {
//       return res.json({
//         profile,
//         plan: existingPlan
//       });
//     }
    
//     const aiPlan = await generatePlan(profile);

//     const savedPlan = await RecoveryPlan.create({
//       userId: req.user.id,
//       addictionType: profile.addictionType,
//       planSteps: aiPlan.planSteps,
//       goodHabit: aiPlan.goodHabit,
//       motivation: aiPlan.motivation
//     });

//     res.json({
//       profile,
//       plan: savedPlan
//     });

//   } catch (error) {

//     res.status(500).json({ error: error.message });

//   }

// });

router.post("/create", authMiddleware, async (req, res) => {

  try {

    const profile = await AddictionProfile.create({
      userId: req.user.id,
      ...req.body
    });

    const existingPlan = await RecoveryPlan.findOne({
      userId: req.user.id
    });

    if (existingPlan) {
      return res.json({
        profile,
        plan: existingPlan
      });
    }

    const aiPlan = await generatePlan(profile);

    const savedPlan = await RecoveryPlan.create({
      userId: req.user.id,
      addictionType: profile.addictionType,
      duration: profile.planDuration,
      days: aiPlan.days,
      goodHabit: aiPlan.goodHabit,
      motivation: aiPlan.motivation,

      // backward compatibility
      planSteps: aiPlan.planSteps
    });
    
    res.json({
      profile,
      plan: savedPlan
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// GET USER PROFILE
router.get("/:userId",authMiddleware, async (req, res) => {

  try {

    const profile = await AddictionProfile.findOne({
      userId: req.params.userId
    });

    res.json(profile);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;