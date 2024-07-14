const { scrapeLinkedInNames } = require('./linkedinScraper');
const { checkAlumniStatus } = require('./pddiktiChecker');
const { scrapePDDikti } = require('./pddiktiScraper');
const { scrapeAlumniProfiles } = require('./linkedinProfileScraper');

(async () => {
  // 1. Scrape LinkedIn names
  const linkedinNames = await scrapeLinkedInNames();
  const alumniNames = [];

  // 2. Check PDDikti status
  for (const name of linkedinNames) {
    const cleanedName = cleanName(name);
    const result = await checkAlumniStatus(cleanedName);

    if (result.isFromEsaUnggul && result.status === 'Lulus') {
      alumniNames.push(name);
    }
  }

  // 3. Scrape PDDikti data
  await scrapePDDikti(alumniNames);

  // 4. Scrape LinkedIn profiles
  for (const name of alumniNames) {
    await scrapeAlumniProfiles(name);
  }
})();
