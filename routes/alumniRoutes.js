const express = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/auth')
const alumniController = require('../controllers/alumniController');

const alumni = express.Router();
const admin = express.Router();


// Alumni routes
alumni.post('/register', alumniController.register);
alumni.post('/login', alumniController.alumniLogin);
alumni.get('/', authenticate, alumniController.getAlumni);
alumni.get('/:id', authenticate, alumniController.getAlumniById);
alumni.post('/', authenticate, alumniController.createAlumni);
alumni.put('/:id', authenticate, alumniController.updateAlumni);
alumni.delete('/:id', authenticate, alumniController.deleteAlumni);

// Admin routes
admin.get('/alumni', authenticate, alumniController.getAlumni);
admin.post('/alumni', authenticate, alumniController.createAlumni);
admin.put('/alumni/:id', authenticate, alumniController.updateAlumni);
admin.delete('/alumni/:id', authenticate, alumniController.deleteAlumni);

// Export the routers
module.exports = {
  alumni,
  admin,
};