const mongoose = require("mongoose");

const DailyLogSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["clean", "trigger", "relapse"],
    required: true
  },

  trigger: {
    type: String
  },

  notes: {
    type: String
  },

  // NEW FIELDS (for prediction)

  triggerType: {
    type: String,
    enum: ["stress", "boredom", "social", "habit", "other"],
    default: "other"
  },

  urgeLevel: {
    type: Number,
    min: 1,
    max: 5
  },

  mood: {
    type: String,
    enum: ["good", "neutral", "stressed", "sad"]
  },

  completedPlan: {
    type: Boolean,
    default: false
  },

  logTime: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("DailyLog", DailyLogSchema);