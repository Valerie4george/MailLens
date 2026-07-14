analyzeBtn.addEventListener("click", async () => {

    const email = emailInput.value;

    const response = await fetch("http://localhost:3000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email
        })
    });

    const data = await response.json();
    console.log(data);

    console.log("SERVER RESPONSE:", data);

result.innerHTML = `
<h2>Analysis Result</h2>

<p><strong>Word Count:</strong> ${data.wordCount}</p>

<p><strong>Character Count:</strong> ${data.characterCount}</p>

<p><strong>Sentence Count:</strong> ${data.sentenceCount}</p>

<p><strong>Quality Score:</strong> ${data.qualityScore}/100</p>

<p>Greeting Detected: ${data.hasGreeting ? "Yes" : "No"}</p>

<p>Sign-off: ${data.hasSignOff ? data.signOff : "Not detected"}</p>

<p><strong>Reading Time:</strong> ${data.readingTime}</p>

<p><strong>Urgent:</strong> ${data.isUrgent ? "Yes" : "No"}</p>

<p><strong>Keywords:</strong> ${
    data.urgencyWords.length
        ? data.urgencyWords.join(", ")
        : "None"
}</p>

`;
});