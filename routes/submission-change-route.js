const express = require('express');
const route = express.Router();
const authenticateAdmin = require('../middleware/adminAuth');
const {
  getAllSubmissionChanges
} = require('../controllers/submissionChangeController');

route.get('/', authenticateAdmin, getAllSubmissionChanges);

module.exports = route;