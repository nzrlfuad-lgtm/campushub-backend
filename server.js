require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// TAMBAHKAN IMPORT INI DI ATAS:
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Backend CampusHub Berhasil Jalan!");
});

// Test route koneksi database
app.get("/api/test-db", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: "Koneksi ke Aiven Database SUKSES!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Panggil semua routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;