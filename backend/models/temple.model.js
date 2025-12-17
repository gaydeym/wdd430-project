const mongoose = require("mongoose");

const templeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["OPERATING", "RENOVATION", "ANNOUNCED", "CONSTRUCTION"],
            default: "ANNOUNCED",
        },
        dedicatedDate: {
            type: String,
            default: "",
        },
        imageUrl: {
            type: String,
            default: "../../assets/images/default.jpg",
        },
    },
    {
        timestamps: true,
        collection: "lds-temples",
    }
);

module.exports = mongoose.model("Temple", templeSchema);
