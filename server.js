const express = require("express");
console.log("Analyze Controller Loaded");
const { analyzeEmail } = require("./controllers/analyzeController");

const app = express();

app.use(express.json());
app.use(express.static("public"));


const PORT = 3000;


app.get("/health", (req, res) => {
    res.send("MailLens server is healthy!");
});

app.post("/analyze", analyzeEmail);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});