require('mysql2');
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route Khusus Sync Database (Aman untuk Vercel Serverless)
app.get("/api/sync-db", async (req, res) => {
  try {
    await db.sequelize.sync({ alter: true });
    res.json({ message: "Database & tabel berhasil di-sync ke Aiven!" });
  } catch (error) {
    res.status(500).json({ message: "Gagal sync database", error: error.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend CampusHub Berhasil Jalan!");
});

module.exports = app;