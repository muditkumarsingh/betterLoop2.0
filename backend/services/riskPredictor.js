const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_API_KEY);

const predictRisk = async (features) => {

  try {

    const text = `
User behavior summary:
Streak ${features.streak}.
Recent triggers ${features.recentTriggers}.
Recent relapses ${features.recentRelapses}.
Missed tasks ${features.missedTasks}.
Average urge level ${features.avgUrgeLevel}.
`;

    const result = await hf.textClassification({
      model: "distilbert-base-uncased-finetuned-sst-2-english",
      inputs: text
    });

    const prediction = result[0];

    let riskLevel = "moderate";
    let riskScore = 0.5;

    if (prediction.label === "NEGATIVE") {
      riskLevel = "high";
      riskScore = Math.min(prediction.score, 0.85);
    }

    if (prediction.label === "POSITIVE") {
      riskLevel = "low";
      riskScore = 1 - prediction.score;
    }

    return {
      modelLabel: prediction.label,
      modelScore: prediction.score,
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