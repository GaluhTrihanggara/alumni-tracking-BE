const express = require('express');
const authenticate = require('../middleware/auth');
const {
    searchAlumni,
    getAlumni, 
    getAlumniById, 
    updateAlumni, 
    deleteAlumni,
    changePassword, 
    getAlumniByNameSlug,
    getAlumniContacts
} = require('../controllers/alumniController');
const route = express.Router();

route.get("/search", authenticate, searchAlumni);
route.get("/", authenticate, getAlumni);
route.get("/:id", authenticate, getAlumniById);
route.put("/:id", authenticate, updateAlumni);
route.delete("/:id", authenticate, deleteAlumni);
route.post("/change-password", authenticate, changePassword);
route.get('/:nameSlug', authenticate, getAlumniByNameSlug);

module.exports = route;