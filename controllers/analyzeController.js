const analyzeEmail = require("../services/emailAnalyzer");

console.log("CONTROLLER FILE LOADED");

const analyzeEmailController = (req, res) => {

    const { email } = req.body;

    const result = analyzeEmail(email);

    console.log("SENDING:", result);

    res.json(result);
};

module.exports = {
    analyzeEmail: analyzeEmailController
};


