const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const generatePlan = async (profile) => {

  const duration = profile.planDuration || 30;

  const prompt = `
You are an addiction recovery expert.

Create a structured recovery plan.

User information:
Addiction: ${profile.addictionType}
Frequency: ${profile.frequency}
Duration of addiction: ${profile.duration}
Triggers: ${profile.triggers.join(", ")}
Goal: ${profile.goal}

The recovery program should last ${duration} days.

Rules:
- Each day must have AT MOST 3 tasks.
- Tasks must help the user reduce or quit the addiction.
- Tasks should be practical and small.
- Tasks should evolve gradually across days.

Return ONLY valid JSON.
Do NOT include markdown or explanations.

Return JSON in this format:

{
 "days":[
   {
     "day":1,
     "tasks":["task1","task2","task3"]
   }
 ],
 "planSteps":["general step1","general step2","general step3"],
 "goodHabit":"habit to replace addiction",
 "motivation":"short motivational line"
}
`;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a professional addiction recovery coach."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.7
  });

  const text = completion.choices[0].message.content;

  let cleanText = text.trim();

  // remove markdown if AI accidentally adds it
  if (cleanText.startsWith("```")) {
    cleanText = cleanText.replace(/```json|```/g, "").trim();
  }

  const parsed = JSON.parse(cleanText);

  // ensure completed flag exists
  if (parsed.days) {
    parsed.days = parsed.days.map(day => ({
      ...day,
      completed: false
    }));
  }

  return parsed;
};

module.exports = generatePlan;