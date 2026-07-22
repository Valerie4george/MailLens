const express = require("express");
const router = express.Router();

const {
    analyzeEmail
} = require("../controllers/analyzeController");

router.post("/", analyzeEmail);

module.exports = router;