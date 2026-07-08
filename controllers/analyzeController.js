const analyzeEmail = (req, res) => {
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
    const sentences = email.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // Paragraph count
    const paragraphs = email
        .split(/\n\s*\n/)
        .filter(p => p.trim().length > 0);

    const paragraphCount = paragraphs.length;

    // Average words per sentence
    const averageWordsPerSentence =
        sentenceCount > 0
            ? Number((wordCount / sentenceCount).toFixed(2))
            : 0;

    // Average words per paragraph
    const averageWordsPerParagraph =
        paragraphCount > 0
            ? Number((wordCount / paragraphCount).toFixed(2))
            : 0;

    // Reading time
    const readingTimeMinutes =
        Number((wordCount / 200).toFixed(2));

    // Greeting detection
    const greetings = ["hi", "hello", "dear", "hey"];
    const firstLine = email.split("\n")[0].toLowerCase();
    const hasGreeting = greetings.some(greeting =>
        firstLine.startsWith(greeting)
    );

    // Sign-off detection
    const signOffs = ["thanks", "regards", "best", "sincerely"];
    const emailLower = email.toLowerCase();

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

    // Question detection
    const questions = email.match(/\?/g) || [];
    const questionCount = questions.length;

    // URL detection
    const urls = email.match(/https?:\/\/[^\s]+|www\.[^\s]+/g) || [];
    const urlCount = urls.length;

    // Email address detection
    const emailAddresses =
        email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    const emailAddressCount = emailAddresses.length;

    // Phone number detection
    const phoneNumbers =
        email.match(/\+?\d[\d\s-]{8,}\d/g) || [];
    const phoneNumberCount = phoneNumbers.length;

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
        questionCount,
        urlCount,
        emailAddressCount,
        phoneNumberCount,
        mentionsAttachment
    });
};

module.exports = {
    analyzeEmail
};