const express = require('express');
const authenticateAdmin = require('../middleware/adminAuth');
const checkAdminRole = require('../middleware/role');
const route = express.Router();
const {
  loginAdmin,
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
} = require("../controllers/adminController");

// New route for creating an admin
route.post("/create", createAdmin);

// Admin login route without authentication middleware
route.post("/login", loginAdmin);

// Routes that require authentication and admin role
route.get("/", authenticateAdmin, checkAdminRole, getAdmins);
route.get("/:id", authenticateAdmin, checkAdminRole, getAdminById);
route.put("/:id", authenticateAdmin, checkAdminRole, updateAdmin);
route.delete("/:id", authenticateAdmin, checkAdminRole, deleteAdmin);

module.exports = route;
