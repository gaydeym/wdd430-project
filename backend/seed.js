require("dotenv").config();
const mongoose = require("mongoose");
const Temple = require("./models/temple.model");
const templesData = require("./data/temples.json");

const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/lds-temples";

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        await Temple.deleteMany({});
        console.log("Cleared existing temples");

        const temples = await Temple.insertMany(templesData);
        console.log(`Successfully seeded ${temples.length} temples`);

        mongoose.connection.close();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
