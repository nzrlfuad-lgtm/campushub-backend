const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const Product = require("../models/Product");
const authMiddleware =
require("../middleware/authMiddleware");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/add",
  authMiddleware,
  upload.single("image"),

  async (req, res) => {
    try {

      const newProduct = await Product.create({
  name: req.body.name,
  price: req.body.price,
  description: req.body.description,
  type: req.body.type,
  image: req.file ? req.file.filename : "",

  sellerName: req.body.sellerName,
  sellerRealName: req.body.sellerRealName,
});

      res.json({
        success: true,
        product: newProduct,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {

    const { type } = req.query;

    let products;

    if (type) {

      products = await Product.findAll({
        where: { type },
      });

    } else {

      products = await Product.findAll();

    }

    res.json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
  try {

    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
      message: "Produk berhasil dihapus",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const product = await Product.findByPk(
        req.params.id
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Produk tidak ditemukan",
        });
      }

      await product.update({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      });

      res.json({
        success: true,
        product,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
);

module.exports = router;