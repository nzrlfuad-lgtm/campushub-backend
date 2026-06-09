const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadOrderFile");

const authMiddleware =
require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  updateStatus,
  deleteOrder,
  takeOrder,
} = require("../controllers/orderController");

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  createOrder
);

router.delete("/:id", deleteOrder);

router.get("/", getOrders);

router.put(
  "/:id/status",
  authMiddleware,updateStatus);

  router.put(
  "/:id/take",
  takeOrder
);

module.exports = router;