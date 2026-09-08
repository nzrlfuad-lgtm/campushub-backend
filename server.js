require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Backend CampusHub Berhasil Jalan!");
});

// Route pengetesan untuk melacak file mana yang bikin crash
app.get("/api/debug", (req, res) => {
  try {
    const db = require("./config/db");
    const authRoutes = require("./routes/authRoutes");
    res.json({ message: "Semua modul berhasil di-load tanpa crash!" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal me-load modul",
      error: error.message,
      stack: error.stack
    });
  }
});

module.exports = app;