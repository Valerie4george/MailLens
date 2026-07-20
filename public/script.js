const analyzeBtn = document.getElementById("analyzeBtn");
const emailInput = document.getElementById("emailInput");
const result = document.getElementById("result");

const emailHistory = [];






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
        const dashboard = generateDashboard(emailHistory);

console.log(emailHistory);
console.log(dashboard);

        console.log("SERVER RESPONSE:", data);

        result.innerHTML = renderAnalysis(data);
       
    } catch (error) {

    console.error(error);

    result.innerHTML = `
        <p style="color:red;">
            Something went wrong while analyzing the email.
        </p>
    `;

}

});