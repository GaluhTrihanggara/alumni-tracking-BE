const alumniScraper = require('../services/alumniScraper'); // Update the path accordingly

const scrapeWebsite = async (req, res) => {
  try {
    const alumniData = await alumniScraper.scrapingWeb(req.body.alumniName);
    res.status(200).json({ success: true, message: 'Scraping successful', data: alumniData });
  } catch (error) {
    console.error('Error scraping website:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { scrapeWebsite };