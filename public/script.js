const analyzeBtn = document.getElementById("analyzeBtn");
const emailInput = document.getElementById("emailInput");
const result = document.getElementById("result");

analyzeBtn.addEventListener("click", async () => {

    const email = emailInput.value;

    const response = await fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });

    const data = await response.json();
    console.log(data);

   result.innerHTML = `
<h2>Analysis Result</h2>

<p><strong>Word Count:</strong> ${data.statistics.wordCount}</p>

<p><strong>Character Count:</strong> ${data.statistics.characterCount}</p>

<p><strong>Sentence Count:</strong> ${data.statistics.sentenceCount}</p>

<p><strong>Paragraph Count:</strong> ${data.statistics.paragraphCount}</p>

<p><strong>Average Words / Sentence:</strong> ${data.statistics.averageWordsPerSentence}</p>

<p><strong>Average Words / Paragraph:</strong> ${data.statistics.averageWordsPerParagraph}</p>

<p><strong>Reading Time:</strong> ${data.statistics.readingTimeMinutes} min</p>

<p><strong>Greeting:</strong> ${data.emailQuality.hasGreeting}</p>

<p><strong>Sign Off:</strong> ${data.emailQuality.hasSignOff}</p>

<p><strong>Urgent:</strong> ${data.flags.isUrgent}</p>

<p><strong>Questions:</strong> ${data.detectedInfo.questionCount}</p>

<p><strong>URLs:</strong> ${data.detectedInfo.urlCount}</p>

<p><strong>Email Addresses:</strong> ${data.detectedInfo.emailAddressCount}</p>

<p><strong>Phone Numbers:</strong> ${data.detectedInfo.phoneNumberCount}</p>

<p><strong>Attachments Mentioned:</strong> ${data.flags.mentionsAttachment}</p>
`;
});