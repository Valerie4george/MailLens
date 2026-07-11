const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "Email content is required"
        });
    }

    // Word count
    const words = email.trim().split(/\s+/);
    const wordCount = words.length;

    // Character count
    const characterCount = email.length;

    // Sentence count
    const sentences = email
        .split(/[.!?]+/)
        .filter(sentence => sentence.trim().length > 0);

    const sentenceCount = sentences.length;

    res.json({
        wordCount,
        characterCount,
        sentenceCount
    });
});

module.exports = router;