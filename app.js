require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./config/mongo");
const analyzeRoute = require("./routes/analyze");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/analyze", analyzeRoute);

async function start() {
    await connectMongo();
    app.listen(
        process.env.PORT,
        () => {
            console.log(`Server started on port ${process.env.PORT}`);
        }
    );
}

start();
