console.log("🔥 USING NEW EMAIL ANALYZER FILE 🔥");

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


    // Very short emails lose points
    if (wordCount < 10) {
        score -= 20;
    }


    // Very long sentences lose points
    const averageWordsPerSentence = wordCount / sentenceCount;

    if (averageWordsPerSentence > 25) {
        score -= 15;
    }


    // No punctuation loses points
    if (!/[.!?]/.test(email)) {
        score -= 10;
    }


    return {
    TEST: "HELLO",
    wordCount,
    characterCount,
    sentenceCount,
    qualityScore: score
};
}


module.exports = analyzeEmail;