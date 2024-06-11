const express = require('express');
const authenticate = require('../middleware/auth');
const route = express.Router();
const {
loginAdmin,
getAdmins,
getAdminById,
updateAdmin,
deleteAdmin
} = require("../controllers/adminController");

route.post("/admin/login", authenticate, loginAdmin);
route.get("/", authenticate, getAdmins);
route.get("/:id", authenticate, getAdminById);
route.put("/:id", authenticate, updateAdmin);
route.delete("/:id", authenticate, deleteAdmin);

module.exports = route;