const express = require('express');
const route = express.Router();
const authenticateAdmin = require('../middleware/adminAuth');
const {
  getAllSubmissionChanges,
  getPendingSubmissions,
  approveProfileChanges
} = require('../controllers/submissionChangeController');

route.get('/', authenticateAdmin, getAllSubmissionChanges);
route.get('/pending', authenticateAdmin, getPendingSubmissions);
route.post('/:id/approve', authenticateAdmin, approveProfileChanges);

module.exports = route;