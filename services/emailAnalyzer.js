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



function analyzeEmail(email) {

    const words = email.trim().split(/\s+/);
    const wordCount = words.length;

    const characterCount = email.length;

    const sentences = email
        .split(/[.!?]/)
        .filter(sentence => sentence.trim() !== "");

    const sentenceCount = sentences.length;


    // Quality score
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


    return {
        TEST: "HELLO",
        wordCount,
        characterCount,
        sentenceCount,
        qualityScore: score,
        hasGreeting
    };
}


module.exports = analyzeEmail;