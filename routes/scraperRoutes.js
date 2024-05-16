const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraperController');

// Define route for triggering the web scraper
router.post('/', scraperController.scrapeWebsite);

module.exports = router;