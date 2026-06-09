const express = require("express");

const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  checkUser
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.post(
  "/check-user",
  checkUser
);

router.put(
  "/forgot-password",
  forgotPassword
);

module.exports = router;