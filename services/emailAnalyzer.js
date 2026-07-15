console.log("🔥 USING NEW EMAIL ANALYZER FILE 🔥");


function detectGreeting(email) {

    const greetings = [
        "hi",
        "hello",
        "hey",
        "dear",
        "respected",
        "good morning",
        "good afternoon",
        "good evening"
    ];

    const firstLine = email
        .trim()
        .split("\n")[0]
        .toLowerCase();

    return greetings.some(greeting =>
        firstLine.startsWith(greeting)
    );
}

function detectSignOff(email) {

    const signOffs = [
        "thank you",
        "thanks",
        "regards",
        "best regards",
        "warm regards",
        "sincerely",
        "best"
    ];

    const lowerEmail = email.toLowerCase();

    for (let signOff of signOffs) {
        if (lowerEmail.includes(signOff)) {
            return signOff;
        }
    }

    return null;
}

function detectUrgency(email) {

    const urgencyWords = [
        "urgent",
        "asap",
        "immediately",
        "deadline",
        "important",
        "priority",
        "action required",
        "tomorrow",
        "today",
        "within 24 hours",
        "due",
        "last date",
        "expires"
    ];

    const lowerEmail = email.toLowerCase();

    const foundWords = urgencyWords.filter(word =>
        lowerEmail.includes(word)
    );

    return foundWords;
}

function detectAttachment(email) {

    const attachmentPhrases = [
    "attached resume",
    "attached document",
    "attached file",
    "find attached",
    "see attached",
    "attached cv",
    "attachment",
    "attached",
    "enclosed"
];

    const lowerEmail = email.toLowerCase();

    for (const phrase of attachmentPhrases) {
        if (lowerEmail.includes(phrase)) {
            return phrase;
        }
    }

    return null;
}

    function categorizeEmail(email) {

    const categories = {
        College: [
            "assignment",
            "exam",
            "semester",
            "professor",
            "lecture",
            "university",
            "college",
            "class",
            "student",
            "course"
        ],

        Internship: [
            "internship",
            "intern",
            "stipend",
            "recruiter",
            "application"
        ],

        Placement: [
            "interview",
            "coding round",
            "aptitude",
            "offer",
            "hr",
            "placement",
            "job"
        ],

        Personal: [
            "birthday",
            "party",
            "family",
            "vacation",
            "dinner",
            "friend"
        ],

        Promotion: [
            "sale",
            "discount",
            "coupon",
            "subscribe",
            "offer",
            "limited time"
        ]
    };

    const lowerEmail = email.toLowerCase();

    let bestCategory = "Other";
    let highestScore = 0;

    for (const category in categories) {

        let score = 0;

        for (const keyword of categories[category]) {

            if (lowerEmail.includes(keyword)) {
                score++;
            }
        }

        if (score > highestScore) {
            highestScore = score;
            bestCategory = category;
        }
    }

    return bestCategory;
}


function detectPriority(category, isUrgent) {

    if (isUrgent) {
        return "High";
    }

    if (category === "Internship") {
        return "High";
    }

    if (category === "Placement") {
        return "High";
    }

    if (category === "College") {
        return "Medium";
    }

    if (category === "Promotion") {
        return "Low";
    }

    return "Medium";
}


function analyzeEmail(email) {

    const words = email.trim().split(/\s+/);
    const wordCount = words.length;

    const characterCount = email.length;

    const sentences = email
        .split(/[.!?]/)
        .filter(sentence => sentence.trim() !== "");

    const sentenceCount = sentences.length;
    const readingTimeMinutes = wordCount / 200;

    let readingTime;

if (readingTimeMinutes < 1) {
    readingTime = `${Math.ceil(readingTimeMinutes * 60)} sec`;
} else {
    readingTime = `${Math.ceil(readingTimeMinutes)} min`;
}

    let score = 100;


    if (wordCount < 10) {
        score -= 20;
    }


    const averageWordsPerSentence = wordCount / sentenceCount;

    if (averageWordsPerSentence > 25) {
        score -= 15;
    }


    if (!/[.!?]/.test(email)) {
        score -= 10;
    }

    const hasGreeting = detectGreeting(email);

    const signOff = detectSignOff(email);

    const hasSignOff = signOff !== null;

    const urgencyWords = detectUrgency(email);

const isUrgent = urgencyWords.length > 0;

const attachmentPhrase = detectAttachment(email);

console.log("Attachment Phrase:", attachmentPhrase);

const mentionsAttachment = attachmentPhrase !== null;

const category = categorizeEmail(email);

const priority = detectPriority(category, isUrgent);


    return {
        wordCount,
        characterCount,
        sentenceCount,
        qualityScore: score,
        hasGreeting,
        hasSignOff,
        signOff,
        readingTime,
        isUrgent,
        urgencyWords,
        mentionsAttachment,
        attachmentPhrase,
        category,
        priority
    };
}


module.exports = analyzeEmail;