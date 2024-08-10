require('dotenv').config();
const puppeteer = require("puppeteer");
const { checkAndScrapeAlumni } = require('./pddiktiChecker');
const { scrapeLinkedInProfiles } = require('./linkedinProfileScraper'); // Pastikan impor dilakukan dengan benar

function cleanName(name) {
  name = name.replace(/\.$/, '');
  name = name.replace(/[^a-zA-Z\s]/g, '');
  name = name.replace(/\s+/g, ' ').trim();
  name = name.replace(/\b\w/g, c => c.toUpperCase());
  return `${name} Universitas Esa Unggul`;
}

const typingSearchInput = async (page, searchText) => {
  const inputFieldSelector = '#global-nav-typeahead > input';
  await page.waitForSelector(inputFieldSelector);
  await page.type(inputFieldSelector, searchText, { delay: 200 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
};

const scrapeLinkedInNames = async () => {
  const loginUrl = "https://www.linkedin.com/login";
  const inputFieldSelector = '#global-nav-typeahead';
  const typeInputSearch = 'Universitas Esa Unggul';
  const univSearchSelector = 'a[href*="company/universitasesaunggul"]';
  const univSelector = 'a[href*="/company/universitas-esa-unggul/"]';
  const alumniSelector = 'a[href*="/school/universitas-esa-unggul/people/"]';
  const scrollToProfileSelector = '.org-people-profile-card__card-spacing .scaffold-finite-scroll__content > ul > li:nth-child(1) > div > section > div';
  const alumniListSelectors = '.org-people-profile-card__profile-title'; 
  let names = [];

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
  });
  const page = await browser.newPage();

  try {
    await page.goto(loginUrl);
    await page.type('#username', process.env.LINKEDIN_USERNAME);
    await page.type('#password', process.env.LINKEDIN_PASSWORD);
    await page.click('#organic-div > form > div.login__form_action_container > button');

    await page.waitForSelector(inputFieldSelector);
    await page.click(inputFieldSelector);
    await page.waitForTimeout(1000);
    await typingSearchInput(page, typeInputSearch);
    await page.waitForTimeout(1000);

    const universityElementExists = await page.$(univSearchSelector);
    if (!universityElementExists) {
      console.log(`University "Universitas Esa Unggul" not found`);
      return [];
    }

    await page.evaluate(async (selector) => {
      const element = document.querySelector(selector);
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }, univSearchSelector);

    await page.waitForTimeout(2000);
    await page.waitForSelector(univSelector, { timeout: 10000 });
    await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.click();
      } else {
        throw new Error("Universitas Esa Unggul link not found");
      }
    }, univSelector);

    await page.waitForSelector(alumniSelector);
    await page.waitForTimeout(2000);
    const alumniLink = await page.$(alumniSelector);
    if (alumniLink) {
      await alumniLink.click();
    } else {
      console.error("Alumni link not found.");
      return [];
    }

    await page.waitForTimeout(3000);

    await page.evaluate(async (selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, scrollToProfileSelector);

    await page.waitForTimeout(2000);

    await page.waitForSelector(alumniListSelectors);
    
    const alumniProfiles = await page.$$(alumniListSelectors);
    let checkedNames = 0;

    for (const profile of alumniProfiles) {
      if (checkedNames >= 3) break;

      const name = await page.evaluate(el => el.innerText.trim(), profile);
      if (name && name !== "Anggota LinkedIn") {
        console.log(`Found alumni: ${name}`);
        names.push(name);

        const cleanedName = cleanName(name);
        console.log(`Mencari informasi untuk: ${cleanedName}`);
        const result = await checkAndScrapeAlumni(cleanedName);

        if (result.isFromEsaUnggul) {
          if (result.isAlumni) {
            console.log(`${name} adalah alumni dari Universitas Esa Unggul. Scraping LinkedIn profile...`);
            await scrapeLinkedInProfiles(name); // Panggil scrapeLinkedInProfiles jika statusnya "Lulus"
          } else {
            console.log(`${name} adalah mahasiswa Universitas Esa Unggul. Status saat ini: ${result.status}`);
          }
        } else {
          console.log(`${name} tidak ditemukan di database Universitas Esa Unggul.`);
        }

        checkedNames++;
      }
    }

    if (names.length === 0) {
      console.log("No valid alumni profile found.");
    }

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }

  return names;
};

module.exports = { scrapeLinkedInNames };
