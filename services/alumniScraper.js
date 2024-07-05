const { scrapeLinkedInNames } = require('./linkedinScraper');
const { checkAlumniStatus } = require('./pddiktiChecker');
// const { scrapeAlumniProfile } = require('./linkedinProfileScraper');
const { scrapePDDikti } = require('./pddiktiScraper');

const scrapingWeb = async (username, password) => {
  // Ambil nama alumni dari LinkedIn
  const alumniNames = await scrapeLinkedInNames(username, password);
  const allResults = [];

  for (const alumniName of alumniNames) {
    console.log(`Checking status for: ${alumniName}`);

    // Cek status alumni di PDDikti
    const isAlumni = await checkAlumniStatus(alumniName);
    if (!isAlumni) {
      console.log(`${alumniName} is not an alumni.`);
      continue; // Skip jika bukan alumni
    }

    console.log(`${alumniName} is an alumni, scraping data...`);

    // // Scrape data dari LinkedIn
    // const linkedInData = await scrapeAlumniProfile(alumniName);
    // console.log(`LinkedIn data for ${alumniName}:`, linkedInData);

    // Scrape data dari PDDikti
    const pddiktiData = await scrapePDDikti(alumniName);
    console.log(`PDDikti data for ${alumniName}:`, pddiktiData);

    // Gabungkan hasil scraping dari LinkedIn dan PDDikti
    const combinedData = { linkedInData, pddiktiData };

    // Simpan data gabungan ke database atau lakukan proses lain sesuai kebutuhan
    allResults.push(combinedData);
  }

  return allResults;
};

module.exports = { scrapingWeb };
