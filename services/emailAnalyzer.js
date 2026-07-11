function analyzeEmail(email) {

    const words = email.trim().split(/\s+/);
    const wordCount = words.length;

    const characterCount = email.length;

    const sentences = email
        .split(/[.!?]/)
        .filter(sentence => sentence.trim() !== "");

    const sentenceCount = sentences.length;

    return {
        wordCount,
        characterCount,
        sentenceCount
    };
}

module.exports = analyzeEmail;