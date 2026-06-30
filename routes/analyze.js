const express = require("express");
const router = express.Router();
const splitWords = require("../utils/splitWords");
const { lookupWord } = require("../services/analyzeService");

router.post("/", async (req, res) => {
    const { text } = req.body;
    const words = splitWords(text);
    const result = [];

    for (const word of words) {
        result.push(await lookupWord(word.toLowerCase()));
    }

    res.json({ words: result });
});

module.exports = router;