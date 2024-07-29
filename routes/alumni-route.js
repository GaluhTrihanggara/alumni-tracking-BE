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