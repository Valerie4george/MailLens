const result = analyzeEmail(email);

return res.json(result);
const analyzeEmail = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "Email content is required"
        });
    }


    // Paragraph count
    const paragraphs = email
        .split(/\n\s*\n/)
        .filter(paragraph => paragraph.trim().length > 0);
    const paragraphCount = paragraphs.length;

    // Average words
    const averageWordsPerSentence =
        sentenceCount > 0
            ? Number((wordCount / sentenceCount).toFixed(2))
            : 0;

    const averageWordsPerParagraph =
        paragraphCount > 0
            ? Number((wordCount / paragraphCount).toFixed(2))
            : 0;

    // Reading time
    const readingTimeMinutes = Number((wordCount / 200).toFixed(2));

    // Greeting detection
    const greetings = ["hi", "hello", "dear", "hey"];
    const firstLine = email.split("\n")[0].toLowerCase();

    const hasGreeting = greetings.some(greeting =>
        firstLine.startsWith(greeting)
    );

    // Lowercase email
    const emailLower = email.toLowerCase();

    // Sign-off detection
    const signOffs = ["thanks", "regards", "best", "sincerely"];

    const hasSignOff = signOffs.some(signOff =>
        emailLower.includes(signOff)
    );

    // Urgency detection
    const urgentWords = [
        "urgent",
        "asap",
        "immediately",
        "important",
        "priority"
    ];

    const isUrgent = urgentWords.some(word =>
        emailLower.includes(word)
    );

    // Questions
    const questionCount = (email.match(/\?/g) || []).length;

    // URLs
    const urlCount =
        (email.match(/https?:\/\/[^\s]+|www\.[^\s]+/g) || []).length;

    // Email addresses
    const emailAddressCount =
        (
            email.match(
                /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
            ) || []
        ).length;

    // Phone numbers
    const phoneNumberCount =
        (
            email.match(/\+?\d[\d\s-]{8,}\d/g) || []
        ).length;

    // Attachment detection
    const attachmentWords = [
        "attached",
        "attachment",
        "enclosed",
        "please find attached"
    ];

    const mentionsAttachment = attachmentWords.some(word =>
        emailLower.includes(word)
    );

    res.json({
        email,

        statistics: {
            wordCount,
            characterCount,
            sentenceCount,
            paragraphCount,
            averageWordsPerSentence,
            averageWordsPerParagraph,
            readingTimeMinutes
        },

        emailQuality: {
            hasGreeting,
            hasSignOff
        },

        flags: {
            isUrgent,
            mentionsAttachment
        },

        detectedInfo: {
            questionCount,
            urlCount,
            emailAddressCount,
            phoneNumberCount
        }
    });
};

module.exports = {
    analyzeEmail
};