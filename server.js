require('mysql2');
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Endpoint utama
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend CampusHub Berhasil Jalan!");
});

module.exports = app;