const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticate = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ 
        message: "Invalid Headers",
      });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        message: "Token Invalid",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { nomor_induk_mahasiswa } = decoded; // Mengambil nomor_induk_mahasiswa dari decoded token
    req.nomor_induk_mahasiswa = nomor_induk_mahasiswa; // Menambahkan nomor_induk_mahasiswa ke dalam request
    next();
  } catch (error) {
    res.status(400).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

module.exports = authenticate;
