const { getDb } = require("../config/mongo");

const COLLECTION_NAME = "compounds";

async function findByWord(word) {
    const db = getDb();

    return await db
        .collection(COLLECTION_NAME)
        .findOne({
            [word]: {
                $exists: true
            }
        });
}

module.exports = {
    findByWord
};