const express = require('express');
const route = express.Router();
const authenticateAdmin = require('../middleware/adminAuth')
const {scrapeWebsite,
    submitScrapedData,
    getPendingScrappingData,
    approveSubmission,
    rejectSubmission
} = require('../controllers/scraperController');

// Define route for triggering the web scraper
route.post('/scrape',authenticateAdmin , scrapeWebsite);
route.post('/submit/scrape', authenticateAdmin, submitScrapedData);
route.get('/scrape/pending', authenticateAdmin, getPendingScrappingData);
route.post('/scrape/:id/approve', authenticateAdmin, approveSubmission);
route.post('/scrape/:id/reject', authenticateAdmin, rejectSubmission);

module.exports = route;
