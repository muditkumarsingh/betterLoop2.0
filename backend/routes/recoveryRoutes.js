const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

router.post("/suggestion", async (req, res) => {

    try {

        const completion = await groq.chat.completions.create({

            messages: [
                {
                    role: "system",
                    content:
                        "You are a motivational recovery assistant helping users avoid addictive urges."
                },
                {
                    role: "user",
                    content:
                        "Suggest ONE short fun activity under 10 words to help someone avoid addiction cravings. Make it creative and engaging."
                }
            ],

            model: "llama-3.1-8b-instant"
        });

        const suggestion =
            completion.choices[0].message.content;

        res.json({ suggestion });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

module.exports = router;