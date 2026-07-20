function renderAnalysis(data) {
    return `
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

                <div class="summary-box">
                    <h3>💡 Summary</h3>
                    <p>${data.summary}</p>
                </div>

                <div class="quality-section">

                    <h3>⭐ Quality Score</h3>

                    <div class="progress-bar">
                        <div
                            class="progress-fill ${getScoreColor(data.qualityScore)}"
                            style="width:${data.qualityScore}%">
                        </div>
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

        </div>
    `;
}