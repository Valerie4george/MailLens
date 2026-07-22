const express = require("express");
const analyzeRoute = require("./routes/analyze");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/analyze", analyzeRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});