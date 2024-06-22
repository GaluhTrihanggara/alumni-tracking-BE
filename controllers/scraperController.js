const alumniScraper = require('../services/alumniScraper'); // Update the path accordingly

const scrapeWebsite = async (req, res) => {
  try {
    const alumniNames = req.body.alumniNames; // Ambil array nama alumni dari request body
    if (!alumniNames || !Array.isArray(alumniNames)) {
      return res.status(400).json({ success: false, message: 'Alumni names are required and should be an array' });
    }
    const alumniData = await alumniScraper.scrapingWeb(alumniNames);
    res.status(200).json({ success: true, message: 'Scraping successful', data: alumniData });
  } catch (error) {
    console.error('Error scraping website:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { scrapeWebsite };
