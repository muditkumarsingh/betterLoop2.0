const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_API_KEY);

const predictRisk = async (features) => {

  try {

    // ----------------------------
    // Rule-based early evaluation
    // ----------------------------

    let ruleRisk = 0;

    if (features.recentRelapses > 0) ruleRisk += 2;
    if (features.recentTriggers > 1) ruleRisk += 1;
    if (features.avgUrgeLevel >= 4) ruleRisk += 1;
    if (features.missedTasks > 0) ruleRisk += 1;
    if (features.streak >= 3) ruleRisk -= 1;

    // baseline risk estimate
    let baseRiskLevel = "moderate";

    if (ruleRisk >= 3) baseRiskLevel = "high";
    else if (ruleRisk <= 0) baseRiskLevel = "low";

    // ----------------------------
    // Send behavioral summary to HF
    // ----------------------------

    const text = `
User recovery behavior summary:
Clean streak: ${features.streak} days.
Recent triggers: ${features.recentTriggers}.
Recent relapses: ${features.recentRelapses}.
Missed recovery tasks: ${features.missedTasks}.
Average urge level: ${features.avgUrgeLevel}.
`;

    const result = await hf.textClassification({
      model: "distilbert-base-uncased-finetuned-sst-2-english",
      inputs: text
    });

    const prediction = result[0];

    // ----------------------------
    // Combine ML + rules
    // ----------------------------

    let riskLevel = baseRiskLevel;
    let riskScore = 0.5;

    if (prediction.label === "NEGATIVE") {
      riskLevel = "high";
      riskScore = Math.max(prediction.score, 0.6);
    }

    if (prediction.label === "POSITIVE") {
      riskLevel = "low";
      riskScore = Math.min(1 - prediction.score, 0.4);
    }

    // override with rules if strong signal
    if (ruleRisk >= 3) {
      riskLevel = "high";
      riskScore = 0.8;
    }

    if (ruleRisk <= 0) {
      riskLevel = "low";
      riskScore = 0.2;
    }

    return {
      modelLabel: prediction.label,
      modelScore: prediction.score,
      ruleScore: ruleRisk,
      riskLevel,
      riskScore
    };

  } catch (error) {

    console.error("Risk prediction error:", error);

    return {
      riskLevel: "unknown",
      riskScore: 0
    };

  }

};

module.exports = predictRisk;