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
    const words = email.trim().split(/\s+/);
const wordCount = words.length;

    // Character count
    const characterCount = email.length;

    // STEP 3: Sentence count
    const sentences = email.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // STEP 4: Paragraph count
const paragraphs = email
    .split(/\n\s*\n/)
    .filter(p => p.trim().length > 0);

const paragraphCount = paragraphs.length;

// STEP 5: Average words per sentence
const averageWordsPerSentence =
    sentenceCount > 0
        ? Number((wordCount / sentenceCount).toFixed(2))
        : 0;

// STEP 6: Average words per paragraph
const averageWordsPerParagraph =
    paragraphCount > 0
        ? Number((wordCount / paragraphCount).toFixed(2))
        : 0;

        // STEP 7: Estimated reading time (minutes)
const readingTimeMinutes =
    Number((wordCount / 200).toFixed(2));
    
    // STEP 8: Greeting detection
const greetings = ["hi", "hello", "dear", "hey"];
const firstLine = email.split("\n")[0].toLowerCase();
const hasGreeting = greetings.some(greeting =>
    firstLine.startsWith(greeting)
);

//STEP 9: Sign-off detection
const signOffs =["thanks,", "regards,", "sincerely,", "best,"];
const lines = email
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

const emailLower = email.toLowerCase();

const hasSignOff = signOffs.some(signOff =>
    emailLower.includes(signOff)
);

//Step 10: Urgency Detection
const urgencyIndicators = ["urgent", "asap", "immediately", "please respond","priority"];
const isUrgent = urgencyIndicators.some(word =>
    emailLower.includes(word)
);
//Step 11: Question Detection
const questions = email.match(/\?/g) || [];
const questionCount = questions.length;



   res.json({
    email,
    wordCount,
    characterCount,
    sentenceCount,
    paragraphCount,
    averageWordsPerSentence,
    averageWordsPerParagraph,
    readingTimeMinutes,
    hasGreeting,
    hasSignOff,
    isUrgent,
    questionCount

});
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});