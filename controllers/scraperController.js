const alumniScraper = require('../services/linkedinScraper');

const scrapeWebsite = async (req, res) => {
  try {
    const results = await alumniScraper.scrapeLinkedInNames();
    res.status(200).json({ success: true, message: 'Scraping successful', data: results });
  } catch (error) {
    console.error('Error scraping website:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { scrapeWebsite };
