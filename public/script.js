const analyzeBtn = document.getElementById("analyzeBtn");
const emailInput = document.getElementById("emailInput");
const result = document.getElementById("result");

const emailHistory = [];

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

function generateDashboard() {

    const totalEmails = emailHistory.length;

    let totalScore = 0;

    const categories = {};

    const priorities = {
        High: 0,
        Medium: 0,
        Low: 0
    };

    for (const email of emailHistory) {

        totalScore += email.qualityScore;

        categories[email.category] =
            (categories[email.category] || 0) + 1;

        priorities[email.priority]++;
    }

    const averageScore =
        Math.round(totalScore / totalEmails);

    return {
        totalEmails,
        averageScore,
        categories,
        priorities
    };

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
        emailHistory.push(data);
        const dashboard = generateDashboard();

console.log(emailHistory);
console.log(dashboard);

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

            <hr>

<div class="dashboard">

<h2>📊 Analytics Dashboard</h2>

<p><strong>Total Emails:</strong> ${dashboard.totalEmails}</p>

<p><strong>Average Score:</strong> ${dashboard.averageScore}/100</p>

<h3>Categories</h3>

<ul>
${Object.entries(dashboard.categories)
.map(([category, count]) =>
`<li>${category}: ${count}</li>`)
.join("")}
</ul>

<h3>Priority Distribution</h3>

<ul>
<li>🔴 High: ${dashboard.priorities.High}</li>
<li>🟡 Medium: ${dashboard.priorities.Medium}</li>
<li>🟢 Low: ${dashboard.priorities.Low}</li>
</ul>

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