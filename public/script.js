const analyzeBtn = document.getElementById("analyzeBtn");
const emailInput = document.getElementById("emailInput");
const result = document.getElementById("result");

function getPriorityBadge(priority) {
    switch (priority) {
        case "High":
            return "🔴 High";
        case "Medium":
            return "🟡 Medium";
        case "Low":
            return "🟢 Low";
        default:
            return priority;
    }
}
function getScoreColor(score) {

    if (score >= 90) {
        return "excellent";
    }

    if (score >= 70) {
        return "good";
    }

    return "poor";
}


analyzeBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();

    if (!email) {
        result.innerHTML = "<p>Please enter an email to analyze.</p>";
        return;
    }

    try {

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

                    <div class="quality-section">

                    <div class="summary-box">

    <h3>💡 Summary</h3>

    <p>${data.summary}</p>

</div>



    <h3>⭐ Quality Score</h3>

    <div class="progress-bar">

        <div
    class="progress-fill ${getScoreColor(data.qualityScore)}"
    style="width: ${data.qualityScore}%"
></div>

    </div>

    <p class="score-text">${data.qualityScore}/100</p>

</div>

                    <div class="insights">

<h3>📌 Insights</h3>

<div class="insight-row">
<span>🏷 Category</span>
<span>${data.category}</span>
</div>

<div class="insight-row">
<span>${getPriorityBadge(data.priority)}</span>
<span>${data.priority}</span>
</div>

<div class="insight-row">
<span>🚨 Urgent</span>
<span>${data.isUrgent ? "Yes" : "No"}</span>
</div>

<div class="insight-row">
<span>👋 Greeting</span>
<span>${data.hasGreeting ? "Detected" : "Not detected"}</span>
</div>

<div class="insight-row">
<span>✍️ Sign-off</span>
<span>${data.hasSignOff ? data.signOff : "Not detected"}</span>
</div>

<div class="insight-row">
<span>📎 Attachment</span>
<span>${data.mentionsAttachment ? data.attachmentPhrase : "None"}</span>
</div>

</div>

            </div>
        `;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <p style="color:red;">
                Something went wrong while analyzing the email.
            </p>
        `;
    }

});