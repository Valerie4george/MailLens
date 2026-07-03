const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to MailLens!");
});

app.get("/health", (req, res) => {
    res.send("MailLens server is healthy!");
});
app.post("/analyze", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "Email content is required"
        });
    }

    // Word count
    const words = email.trim().split(" ");
    const wordCount = words.length;

    // Character count
    const characterCount = email.length;

    // STEP 3: Sentence count
    const sentences = email.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    res.json({
        email,
        wordCount,
        characterCount,
        sentenceCount
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});