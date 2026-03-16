const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a supportive addiction recovery assistant. Motivate the user and suggest healthy alternatives when they feel triggered."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;