const express = require('express')
const route = express.Router()
const scraperController = require('../controllers/scraperController')

// Define route for triggering the web scraper
route.post('/scrape', scraperController.scrapeWebsite);

module.exports = route;