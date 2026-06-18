const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/analyze", (req, res) => {

    console.log("API called");

    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            success: false,
            error: "text is required"
        });
    }

    res.json({
        success: true,
        data: {
            word: text,
            meaning: "devotion",
            originLanguage: "Latin",

            morphemes: [
                {
                    text: "de",
                    meaning: "away, down"
                },
                {
                    text: "dic",
                    meaning: "declare, proclaim"
                },
                {
                    text: "ation",
                    meaning: "act or process"
                }
            ]
        }
    });

});

app.listen(3000, () => {
    console.log("API running on 3000");
});
