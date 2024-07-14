require('dotenv').config();
const puppeteer = require('puppeteer');
const {scrapeLinkedInNames} = require('./linkedinScraper');

function cleanName(name) {
  // Menghapus titik di akhir nama
  name = name.replace(/\.$/, '');
  
  // Menghapus karakter khusus dan angka
  name = name.replace(/[^a-zA-Z\s]/g, '');
  
  // Menghapus spasi berlebih
  name = name.replace(/\s+/g, ' ').trim();
  
  // Menambahkan "Universitas Esa Unggul" di belakang nama
  return `${name} Universitas Esa Unggul`;
}

const typingSearchInput = async (page, searchText) => {
  const inputFieldSelector = '#global-nav-typeahead > input';
  await page.waitForSelector(inputFieldSelector);
  await page.type(inputFieldSelector, searchText, { delay: 150 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(3000);
};

const scrapeAlumniProfiles = async (alumniName) => {
  const cleanedName = cleanName(alumniName);
  const profileSelector = '.entity-result__title-line span';
  const scrollToCompanySelector = '#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-md.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section:nth-child(5) > div.sjoTiQXsIrHRaOZVCcNpsUnpmNfFurXkMeiWaq > ul > li:nth-child(1) > div';
  const nameSelector = 'h1.text-heading-xlarge';
  const jobTitleSelector = '.text-body-medium';
  const companyNameSelector = 'div[class*="inline-show-more-text--is-collapsed"]';
  const loginUrl = "https://www.linkedin.com/login";
  const inputFieldSelector = '#global-nav-typeahead';
  let profileData = {};
  
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
  });
  const page = await browser.newPage();

  try {
    // Login to LinkedIn
    await page.goto(loginUrl);
    await page.type('#username', process.env.LINKEDIN_USERNAME);
    await page.type('#password', process.env.LINKEDIN_PASSWORD);
    await page.click('#organic-div > form > div.login__form_action_container > button');

    // Search for alumni profile
    await page.waitForSelector(inputFieldSelector);
    await page.click(inputFieldSelector);
    await page.waitForTimeout(1000);
    await typingSearchInput(page, cleanedName);
    await page.waitForTimeout(1000);

    // Click on the alumni profile
    await page.click(profileSelector);
    
    // Scroll to company
    await page.evaluate(async (selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, scrollToCompanySelector);

    await page.waitForTimeout(2000);
    
    const name = await page.$eval(nameSelector, el => el.textContent.trim());
    
    const jobTitle = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element ? element.textContent.trim() : 'Not found';
    }, jobTitleSelector);

    const companyName = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element ? element.textContent.trim() : 'Not found';
    }, companyNameSelector);

    profileData = {
      name,
      jobTitle,
      companyName
    };

    console.log(profileData);
  } catch (error) {
    console.error(`Error scraping profile for ${alumniName}:`, error);
  } finally {
    await browser.close();
  }

  return profileData;
}; 

(async () => {
  const alumniNames = await scrapeLinkedInNames();

  for (const name of alumniNames) {
    console.log(`Scraping profile for: ${name}`);
    await scrapeAlumniProfiles(name);
  }
})();

module.exports = { scrapeAlumniProfiles };