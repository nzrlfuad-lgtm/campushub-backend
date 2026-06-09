const Product = require("../models/Product");

exports.createProduct = async (req, res) => {

  try {

    const {
      name,
      price,
      description,
      sellerName,
      type,
    } = req.body;

    const product = await Product.create({

      name,
      price,
      description,
      sellerName,
      type,

      image: req.file
        ? req.file.filename
        : null,

    });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getProducts = async (req, res) => {

  try {

    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};