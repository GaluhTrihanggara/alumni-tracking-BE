const express = require('express');
const route = express.Router();
const authenticateAdmin = require('../middleware/adminAuth')
const {scrapeWebsite} = require('../controllers/scraperController');

// Define route for triggering the web scraper
route.post('/scrape',authenticateAdmin , scrapeWebsite);

module.exports = route;
