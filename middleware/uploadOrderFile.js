const multer = require("multer");
const fs = require("fs");

if (!fs.existsSync("uploads/orders")) {
  fs.mkdirSync("uploads/orders", {
    recursive: true,
  });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/orders");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});
const fs = require("fs");
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Hanya PDF, DOC, DOCX")
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;