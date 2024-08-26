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
  deleteAdmin,
  changePassword,
  adminSearchAlumni,
  getAlumniByNameSlug,
  getAdminProfile,
  getAlumniContacts,
  getAlumniByYearAndProgram,
  getAlumniSalaryData,
  updateAdminProfile
} = require("../controllers/adminController");
const {getProgramStudis} = require('../controllers/program_studi')
const {updateAlumni} = require('../controllers/alumniController');
const {getMediaSosialByAlumniId} = require('../controllers/media_sosial_alumniController');
const {getMediaSosials} = require('../controllers/media_sosialController')

// New route for creating an admin
route.post("/create", createAdmin);

// Admin login route without authentication middleware
route.post("/login", loginAdmin);

route.get ("/search", authenticateAdmin, adminSearchAlumni);
route.get("/contacts", authenticateAdmin, getAlumniContacts);
route.put ("/alumni/:id", authenticateAdmin, updateAlumni);

route.get ("/media-sosial-alumni/:id", authenticateAdmin, getMediaSosialByAlumniId);
route.get("/media-sosial",authenticateAdmin ,getMediaSosials);
route.get('/alumni/:nameSlug', authenticateAdmin, getAlumniByNameSlug);
// New route for getting alumni waiting time data
route.get("/alumni-by-year-and-program", authenticateAdmin, getAlumniByYearAndProgram);
route.get('/alumni-salary', authenticateAdmin, getAlumniSalaryData);

route.get("/profile", authenticateAdmin, getAdminProfile);
route.put("/profile", authenticateAdmin, updateAdminProfile);

route.get("/program-studi", authenticateAdmin, getProgramStudis);
// Routes that require authentication and admin role
route.get("/", authenticateAdmin, getAdmins);
route.get("/:id", authenticateAdmin, getAdminById);
route.put("/:id", authenticateAdmin, checkAdminRole, updateAdmin);
route.delete("/:id", authenticateAdmin, checkAdminRole, deleteAdmin);
route.post("/change-password", authenticateAdmin, changePassword);
module.exports = route;
