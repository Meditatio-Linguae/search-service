const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const MAX_WORDS = 25;

/**
 * Mock dictionary
 * Sau này thay bằng DB / AI / Dictionary service
 */
const MORPHEME_DB = {
    dedication: [
        {
            text: "de",
            meaning:
                "down, away, from, throughly, undoing, against",
            root: "de",
            origin: "latin"
        },
        {
            text: "dic",
            meaning: "to speak, to say",
            root: "dicare",
            origin: "latin"
        },
        {
            text: "at",
            meaning: "makes a verb, causes to be",
            root: "atus",
            origin: "latin"
        },
        {
            text: "ion",
            meaning: "act of, state of, result of",
            root: "io",
            origin: "latin"
        }
    ],

    aggression: [
        {
            text: "ag",
            meaning:
                "to, toward, against, near",
            root: "ad",
            origin: "latin"
        },
        {
            text: "gress",
            meaning: "step, go",
            root: "gradus",
            origin: "latin"
        },
        {
            text: "ion",
            meaning:
                "doing or making of",
            root: "io",
            origin: "latin"
        }
    ]
};

app.post("/api/analyze", (req, res) => {
    console.log("POST /api/analyze");
    const { text } = req.body;

    if (!text || typeof text !== "string") {
        return res.status(400).json({
            error: "text is required"
        });
    }

    const words = splitWords(text);

    if (words.length > MAX_WORDS) {
        return res.status(400).json({
            error: `Maximum ${MAX_WORDS} words allowed`
        });

    }

    const results = words.map(word => ({
        fullWord: word,
        morphemes: MORPHEME_DB[word] || []
    }));

    return res.status(200).json({
        words: results
    });
});

function splitWords(text) {
    if (typeof text !== "string") {
        return [];
    }

    return text.toLowerCase().match(/\S+/g) || [];
}

app.listen(3000, () => {
    console.log("Anglysis API running on port 3000");
});
