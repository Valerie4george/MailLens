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

<div class="result-card">

<h2>📧 Analysis Result</h2>

<div class="stats">

<div class="card">
<h3>📝 Words</h3>
<p>${data.wordCount}</p>
</div>

<div class="card">
<h3>🔤 Characters</h3>
<p>${data.characterCount}</p>
</div>

<div class="card">
<h3>📄 Sentences</h3>
<p>${data.sentenceCount}</p>
</div>

<div class="card">
<h3>⏱ Reading Time</h3>
<p>${data.readingTime}</p>
</div>

</div>


<div class="details">

<p>
<strong>Quality Score:</strong>
${data.qualityScore}/100
</p>

<p>
<strong>Category:</strong>
${data.category}
</p>

<p>
<strong>Priority:</strong>
${data.priority}
</p>

<p>
<strong>Greeting:</strong>
${data.hasGreeting ? "Detected ✅" : "Not detected"}
</p>

<p>
<strong>Sign-off:</strong>
${data.hasSignOff ? data.signOff : "Not detected"}
</p>

<p>
<strong>Urgent:</strong>
${data.isUrgent ? "Yes 🚨" : "No"}
</p>

<p>
<strong>Urgency Keywords:</strong>
${data.urgencyWords.length ? data.urgencyWords.join(", ") : "None"}
</p>

<p>
<strong>Attachment:</strong>
${data.mentionsAttachment ? data.attachmentPhrase : "None"}
</p>

</div>

</div>


<h2>Analysis Result</h2>

<p><strong>Word Count:</strong> ${data.wordCount}</p>

<p><strong>Character Count:</strong> ${data.characterCount}</p>

<p><strong>Sentence Count:</strong> ${data.sentenceCount}</p>

<p><strong>Quality Score:</strong> ${data.qualityScore}/100</p>

<p><strong>Category:</strong> ${data.category}</p>

<p><strong>Priority:</strong> ${data.priority}</p>

<p><strong>Reading Time:</strong> ${data.readingTime}</p>

<p>Greeting Detected: ${data.hasGreeting ? "Yes" : "No"}</p>

<p>Sign-off: ${data.hasSignOff ? data.signOff : "Not detected"}</p>

<p><strong>Urgent:</strong> ${data.isUrgent ? "Yes" : "No"}</p>

<p><strong>Keywords:</strong> ${
    data.urgencyWords.length
        ? data.urgencyWords.join(", ")
        : "None"
}</p>

<p><strong>Attachment Mentioned:</strong> ${
    data.mentionsAttachment ? "Yes" : "No"
}</p>

<p><strong>Matched Phrase:</strong> ${
    data.attachmentPhrase || "None"
}</p>


`;
});