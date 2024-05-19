const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("../backend/src/routes");
const connectDB = require("./src/config/db");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 4040;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))
app.use(express.json());
app.use(bodyParser.json());

app.use("/", routes);

const start = async() => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()