require('dotenv').config(); // Load environment variables from .env
const puppeteer = require("puppeteer");
const { checkAlumniStatus } = require('./pddiktiChecker');

const typingSearchInput = async (page, searchText) => {
  const inputFieldSelector = '#global-nav-typeahead > input';
  await page.waitForSelector(inputFieldSelector);
  await page.type(inputFieldSelector, searchText, { delay: 100 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
};

const scrapeLinkedInNames = async () => {
  const loginUrl = "https://www.linkedin.com/login";
  const inputFieldSelector = '#global-nav-typeahead';
  const typeInputSearch = 'Universitas Esa Unggul';
  const univSelector = 'a[href*="company/universitasesaunggul"]';
  const alumniSelector = 'a[href*="/school/universitasesaunggul/people/"]';
  const scrollToProfileSelector = '.org-people-profile-card__card-spacing .scaffold-finite-scroll__content > ul > li:nth-child(1) > div > section > div';
  const alumniListSelectors = '.org-people-profile-card__profile-title'; 
  let names = []; // Array untuk menyimpan nama alumni yang di-scrape

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  // Login ke LinkedIn
  await page.goto(loginUrl);
  await page.type('#username', process.env.LINKEDIN_USERNAME);
  await page.type('#password', process.env.LINKEDIN_PASSWORD);
  await page.click('#organic-div > form > div.login__form_action_container > button');

  // Navigasi ke halaman pencarian LinkedIn
  await page.waitForSelector(inputFieldSelector);
  await page.click(inputFieldSelector);
  await page.waitForTimeout(1000);
  await typingSearchInput(page, typeInputSearch);
  await page.waitForTimeout(1000);

  // Scroll ke hasil pencarian Universitas Esa Unggul dan klik
  const universityElementExists = await page.$(univSelector);
  if (!universityElementExists) {
    console.log(`University "Universitas Esa Unggul" not found`);
    await browser.close();
    return [];
  }

  await page.evaluate(async (selector) => {
    const element = document.querySelector(selector);
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, univSelector);

  await page.waitForTimeout(2000);
  await page.waitForSelector(univSelector);
  await page.click(univSelector);

  // Navigasi ke halaman alumni
  await page.waitForSelector(alumniSelector);
  await page.waitForTimeout(2000);
  const alumniLink = await page.$(alumniSelector);
  if (alumniLink) {
    await alumniLink.click();
  } else {
    console.error("Alumni link not found.");
    await browser.close();
    return [];
  }

  // Tunggu hingga halaman alumni dimuat sepenuhnya sebelum melakukan scroll
  await page.waitForTimeout(3000); // Tambahkan jeda waktu untuk memastikan halaman sudah dimuat sepenuhnya

  // Scroll ke bagian profile alumni
  const scrollToProfile = async () => {
    await page.evaluate(async (selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, scrollToProfileSelector);
  };

  await scrollToProfile();
  await page.waitForTimeout(2000);

  // Pastikan elemen alumni list sudah muncul
  await page.waitForSelector(alumniListSelectors);
  
 // Get the alumni names
  const alumniProfiles = await page.$$(alumniListSelectors);

  for (const profile of alumniProfiles) {
    const name = await page.evaluate(el => el.innerText.trim(), profile);
    if (name && name !== "Anggota LinkedIn") {
      console.log(`Found alumni: ${name}`);
      names.push(name);

      // Check PDDikti for the alumni name
      const result = await checkAlumniStatus(name);
      if (result.isAlumni) {
        console.log(`${name} is an alumni of Universitas Esa Unggul.`);
        await browser.close();
        return { name, status: 'Alumni', university: result.university };
      } else {
        console.log(`${name} bukan alumni Universitas Esa Unggul. Ditemukan di ${result.university}`);
      }
    }
  }

  console.log("No valid alumni profile found.");
  await browser.close();
  return null;
};

module.exports = { scrapeLinkedInNames };
