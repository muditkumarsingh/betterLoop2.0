const mongoose = require("mongoose");

const DayPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },

  tasks: {
    type: [String],
    required: true
  },

  completed: {
    type: Boolean,
    default: false
  } ,

  completedAt:{
    type:String
  }

}, { _id: false });


const RecoveryPlanSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  addictionType: {
    type: String
  },

  duration: {
    type: Number
  },

  // NEW STRUCTURE
  days: [DayPlanSchema],

  // OLD STRUCTURE (kept for safety)
  planSteps: [String],

  goodHabit: String,

  motivation: String

}, { timestamps: true });


module.exports = mongoose.model("RecoveryPlan", RecoveryPlanSchema);