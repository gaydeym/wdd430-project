const express = require("express");
const router = express.Router();
const Temple = require("../models/temple.model");

router.get("/", async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status: status.toUpperCase() } : {};
        const temples = await Temple.find(filter).sort({ name: 1 });
        res.json(temples);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const temple = await Temple.findById(req.params.id);
        if (!temple) {
            return res.status(404).json({ message: "Temple not found" });
        }
        res.json(temple);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const temple = new Temple({
        name: req.body.name,
        location: req.body.location,
        status: req.body.status,
        dedicatedDate: req.body.dedicatedDate,
        imageUrl: req.body.imageUrl,
    });

    try {
        const newTemple = await temple.save();
        res.status(201).json(newTemple);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const temple = await Temple.findById(req.params.id);
        if (!temple) {
            return res.status(404).json({ message: "Temple not found" });
        }

        if (req.body.name) temple.name = req.body.name;
        if (req.body.location) temple.location = req.body.location;
        if (req.body.status) temple.status = req.body.status;
        if (req.body.dedicatedDate !== undefined)
            temple.dedicatedDate = req.body.dedicatedDate;
        if (req.body.imageUrl !== undefined)
            temple.imageUrl = req.body.imageUrl;

        const updatedTemple = await temple.save();
        res.json(updatedTemple);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const temple = await Temple.findById(req.params.id);
        if (!temple) {
            return res.status(404).json({ message: "Temple not found" });
        }

        await Temple.findByIdAndDelete(req.params.id);
        res.json({ message: "Temple deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
