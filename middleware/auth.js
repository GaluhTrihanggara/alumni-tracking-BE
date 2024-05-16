const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/index');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { nomor_induk_mahasiswa } = decoded; // Mengambil nomor_induk_mahasiswa dari decoded token
    req.nomor_induk_mahasiswa = nomor_induk_mahasiswa; // Menambahkan nomor_induk_mahasiswa ke dalam request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};

module.exports = authenticate;
