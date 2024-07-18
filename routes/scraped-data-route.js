const express = require('express');
const route = express.Router();
const scrapedDataController = require('../controllers/alumni_sementaraController');

route.get('/scraped-data', scrapedDataController.getAllPendingData);
route.post('/scraped-data/approve/:id', scrapedDataController.approveData);
route.post('/scraped-data/reject/:id', scrapedDataController.rejectData);

module.exports = route;