const { MongoClient } = require("mongodb");

const client = new MongoClient(
    process.env.MONGO_URI
);

let db;

async function connectMongo() {
    await client.connect();

    db = client.db(
        process.env.DB_NAME
    );

    console.log("Mongo Connected");
}

function getDb() {
    return db;
}

module.exports = {
    connectMongo,
    getDb
};
