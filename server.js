const express = require("express");
const { analyzeEmail } = require("./controllers/analyzeController");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to MailLens!");
});

app.get("/health", (req, res) => {
    res.send("MailLens server is healthy!");
});

app.post("/analyze", analyzeEmail);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});