const wordModel = require("../models/wordModel");

async function lookupWord(word) {
    const doc = await wordModel.findByWord(word);

    if (!doc) {
        return {
            fullWord: word,
            morphemes: []
        };
    }

    const data = doc[word];

    return {
        fullWord: word,
        morphemes: data.parts.map(part => ({
            text: part.orth,
            meaning: part.meanings,
            root: part.root_orth,
            origin: part.origin_of_tongue
        }))
    };
}

module.exports = {
    lookupWord
};