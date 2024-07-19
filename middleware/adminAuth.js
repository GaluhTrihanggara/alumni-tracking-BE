const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticateAdmin = (req, res, next) => {
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
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        message: "Forbidden: You don't have admin rights",
      });
    }
    req.user = decoded; // Simpan decoded token ke req.user
    next();
  } catch (error) {
    res.status(400).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

module.exports = authenticateAdmin;
