// adminController.js
const { admin } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

getAdmins: async (req, res) => {
  try {
    const admins = await admin.findAll();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving admins' });
  }
},

getAdminById: async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await admin.findByPk(id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving admin' });
  }
},

updateAdmin: async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await admin.findByPk(id);
    if (admin) {
      await admin.update(req.body);
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating admin' });
  }
},

deleteAdmin: async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await admin.findByPk(id);
    if (admin) {
      await admin.destroy();
      res.json({ message: 'Admin deleted successfully' });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting admin' });
  }
},

loginAdmin: async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await admin.findOne({ where: { email, password } });
    if (admin) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
},
}