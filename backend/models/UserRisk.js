const mongoose = require("mongoose");

const UserRiskSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  riskScore: {
    type: Number,
    default: 0
  },

  riskLevel: {
    type: String,
    enum: ["low", "moderate", "high", "unknown"],
    default: "unknown"
  }

}, { timestamps: true });

module.exports = mongoose.model("UserRisk", UserRiskSchema);