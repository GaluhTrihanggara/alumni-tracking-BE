const express = require('express');
const route = express.Router();
const authenticateAdmin = require('../middleware/adminAuth');
const {
    getAllPendingData,
    approveData,
    rejectData
} = require('../controllers/alumni_sementaraController');

route.get('/scraped-data', authenticateAdmin ,getAllPendingData);
route.post('/scraped-data/approve/:id', authenticateAdmin ,approveData);
route.post('/scraped-data/reject/:id', authenticateAdmin ,rejectData);

module.exports = route;