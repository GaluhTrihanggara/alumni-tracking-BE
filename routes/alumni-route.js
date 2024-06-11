const express = require('express');
const authenticate = require('../middleware/auth');
const {
    getAlumni, 
    getAlumniById, 
    updateAlumni, 
    deleteAlumni
} = require('../controllers/alumniController');
const route = express.Router();

route.get("/", authenticate, getAlumni);
route.get("/:id", authenticate, getAlumniById);
route.put("/:id", authenticate, updateAlumni);
route.delete("/:id", authenticate, deleteAlumni);

module.exports = route;




// // Alumni routes
// alumni.post("/register", createAlumni);
// alumni.get("/", authenticate, getAlumni);
// alumni.get("/:id", authenticate, getAlumniById);
// alumni.put("/:id", authenticate, updateAlumni);
// alumni.delete("/:id", authenticate, deleteAlumni);

// // Admin routes
// admin.get("/", getAdmins);
// admin.get("/:id", authenticate, getAdminById);
// admin.put("/:id", authenticate, updateAdmin);
// admin.delete("/alumni/:id", authenticate, deleteAdmin);

// // Export the routers
// module.exports = alumni, admin;
