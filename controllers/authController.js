const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {

    const {
      name,
      nim,
      email,
      password,
      role,
    } = req.body;

    if (
  !name ||
  !nim ||
  !email ||
  !password
) {
  return res.status(400).json({
    message: "Semua field wajib diisi",
  });
}

if (password.length < 6) {
  return res.status(400).json({
    message:
      "Password minimal 6 karakter",
  });
}

    const userExists = await User.findOne({
      where: { nim },
    });

    if (userExists) {
      return res.status(400).json({
        message: "NIM sudah digunakan",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      nim,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
  message: "Berhasil Mendaftarkan Akun",
  user: {
    id: user.id,
    name: user.name,
    nim: user.nim,
    email: user.email,
    role: user.role,
  },
});

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.login = async (req, res) => {
  try {

    const { nim, password } = req.body;

    if (!nim || !password) {
  return res.status(400).json({
    message: "NIM dan password wajib diisi",
  });
}

    const user = await User.findOne({
      where: { nim },
    });

    if (!user) {
      return res.status(400).json({
        message: "NIM tidak ditemukan",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

   res.json({
  message: "Berhasil Masuk",
  token,
  user: {
    id: user.id,
    name: user.name,
    nim: user.nim,
    email: user.email,
    role: user.role,
  },
});

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.forgotPassword = async (req, res) => {

  try {

    const { nim, newPassword } = req.body;

    const user = await User.findOne({
      where: { nim }
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password berhasil direset"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.checkUser = async (req, res) => {

  try {

    const { nim } = req.body;

    const user = await User.findOne({
      where: { nim }
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    res.json({
      message: "User ditemukan"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};