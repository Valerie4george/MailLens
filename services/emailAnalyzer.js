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


    return {
        wordCount,
        characterCount,
        sentenceCount,
        qualityScore: score,
        hasGreeting,
        hasSignOff,
        signOff,
        readingTime
    };
}


module.exports = analyzeEmail;