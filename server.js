const express = require("express");
const cors = require("cors");
const path = require("path");
const Order = require("./models/Order");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

const sequelize = require("./config/db");

const User = require("./models/User");
const Product = require("./models/Product");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Backend CampusHub jalan");
});

const PORT =
  process.env.PORT || 5000;
  
// Sync database
sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database error:", err);
  });

// Jalankan server lokal
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// WAJIB UNTUK VERCEL:
module.exports = app;