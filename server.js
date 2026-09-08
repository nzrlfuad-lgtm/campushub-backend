require('mysql2');
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db"); // Pastikan import db

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Sync tabel ke database Aiven secara otomatis
db.sequelize.sync({ alter: true })
  .then(() => console.log("Database & tables synced!"))
  .catch((err) => console.error("Failed to sync db: ", err));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend CampusHub Berhasil Jalan!");
});

module.exports = app;