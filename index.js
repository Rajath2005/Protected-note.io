const express = require("express");
const cors = require("cors");

// In-memory database (Replace with a real database later)
const notesDB = {};

const app = express();
app.use(cors());
app.use(express.json());

// Save a note
app.post("/saveNote", (req, res) => {
    const { name, password, note } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: "Name and password are required" });
    }

    notesDB[name] = { password, note };
    res.json({ message: "Note saved successfully!" });
});

// Retrieve a note
app.get("/getNote", (req, res) => {
    const { name, password } = req.query;

    if (!name || !password || !notesDB[name]) {
        return res.status(404).json({ error: "Note not found!" });
    }

    if (notesDB[name].password !== password) {
        return res.status(401).json({ error: "Incorrect password!" });
    }

    res.json({ note: notesDB[name].note });
});

// Root route
app.get("/", (req, res) => {
    res.send("Protected Note API is running!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));