const alumniScraper = require('../services/linkedinScraper');
const { checkAndScrapeAlumni } = require('../services/pddiktiChecker');
const { scrapeLinkedInProfiles } = require('../services/linkedinProfileScraper');

const scrapeWebsite = async (req, res) => {
  try {
    let alumniNames = [];

    // Check if names are provided in the request body
    if (req.body && req.body.names && Array.isArray(req.body.names) && req.body.names.length > 0) {
      alumniNames = req.body.names;
    } else {
      // If no names provided, scrape from LinkedIn
      alumniNames = await alumniScraper.scrapeLinkedInNames();
    }

    const results = [];

    for (const name of alumniNames) {
      console.log(`Processing: ${name}`);
      const pddiktiResult = await checkAndScrapeAlumni(name);

      if (pddiktiResult.isFromEsaUnggul) {
        if (pddiktiResult.isAlumni) {
          console.log(`${name} is an alumni of Universitas Esa Unggul. Scraping LinkedIn profile...`);
          const linkedInProfile = await scrapeLinkedInProfiles(name);
          results.push({
            name,
            pddiktiInfo: pddiktiResult,
            linkedInProfile
          });
        } else {
          console.log(`${name} is a student of Universitas Esa Unggul. Current status: ${pddiktiResult.status}`);
          results.push({
            name,
            pddiktiInfo: pddiktiResult
          });
        }
      } else {
        console.log(`${name} not found in Universitas Esa Unggul database.`);
        results.push({
          name,
          pddiktiInfo: pddiktiResult
        });
      }
    }

    res.status(200).json({ success: true, message: 'Scraping successful', data: results });
  } catch (error) {
    console.error('Error scraping website:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { scrapeWebsite };