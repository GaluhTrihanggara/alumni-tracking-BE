const jwt = require('jsonwebtoken');
const { Alumni } = require('../models'); // Make sure to import your Alumni model
require("dotenv").config();

const authenticate = async (req, res, next) => {
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
    // Fetch the alumni based on nomor_induk_mahasiswa
    const alumni = await Alumni.findOne({ where: { nomor_induk_mahasiswa } });
    if (!alumni) {
      return res.status(404).json({
        message: "Alumni not found",
      });
    }

    req.user = alumni; // Set the entire alumni object to req.user
    next();
  } catch (error) {
    res.status(400).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

module.exports = authenticate;