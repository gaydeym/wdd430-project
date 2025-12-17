require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const templeRoutes = require("./routes/temple.routes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/lds-temples";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });

app.use("/api/temples", templeRoutes);

app.get("/", (req, res) => {
    res.json({ message: "LDS Temples API is running" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
