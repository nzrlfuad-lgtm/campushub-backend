const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {

  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

    const {
      productName,
      buyerName,
      buyerRealName,
      nim,
      sellerName,
      type,
      quantity,
      building,
      floor,
      room,
      copies,
      note,
      color,
      paperSize,
    } = req.body;

    const order = await Order.create({
  productName,
  buyerName,
  buyerRealName,
  nim,
  sellerName,
  type,
  quantity,
  building,
  floor,
  room,
  copies,
  note,
  color,
  paperSize,

  file: req.file
    ? req.file.filename
    : null,
});

console.log("ORDER BERHASIL DISIMPAN:");
console.log(order.toJSON());

    res.status(201).json(order);

  }catch (error) {

  console.log("ERROR CREATE ORDER:");
  console.log(error);

  res.status(500).json({
    message: error.message,
  });

}
};

exports.getOrders = async (req, res) => {
  try {

    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.updateStatus = async (req, res) => {
  try {

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order tidak ditemukan",
      });
    }

    order.status = req.body.status;

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.deleteOrder = async (req, res) => {

  try {

    const order = await Order.findByPk(
      req.params.id
    );

    if (!order) {

      return res.status(404).json({
        message: "Order tidak ditemukan",
      });

    }

    await order.destroy();

    res.json({
      message: "Pesanan berhasil dibatalkan",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.takeOrder = async (req, res) => {

  try {

    const order =
      await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Pesanan tidak ditemukan",
      });
    }

    // hanya print & jastip
    if (
      order.type !== "print" &&
      order.type !== "jastip"
    ) {
      return res.status(400).json({
        message: "Pesanan tidak bisa diambil",
      });
    }

    // kalau sudah ada seller
    if (order.sellerName) {
      return res.status(400).json({
        message: "Pesanan sudah diambil",
      });
    }

    await order.update({
      sellerName: req.body.sellerName,
      sellerRealName:
        req.body.sellerRealName,
      status: "Diproses",
    });

    res.json({
      message: "Pesanan berhasil diambil",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};