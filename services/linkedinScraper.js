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
  const univSearchSelector = 'a[href*="company/universitasesaunggul"]';
  const univSelector = 'a[href*="/company/universitas-esa-unggul/"]';
  const alumniSelector = 'a[href*="/school/universitas-esa-unggul/people/"]';
  const scrollToProfileSelector = '.org-people-profile-card__card-spacing .scaffold-finite-scroll__content > ul > li:nth-child(1) > div > section > div';
  const alumniListSelectors = '.org-people-profile-card__profile-title'; 
  let names = []; // Array untuk menyimpan nama alumni yang di-scrape

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--start-maximized' // Membuka browser dalam mode fullscreen
    ],
    defaultViewport: null // Menonaktifkan viewport default
  });
  const page = await browser.newPage();

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
  const universityElementExists = await page.$(univSearchSelector);
  if (!universityElementExists) {
    console.log(`University "Universitas Esa Unggul" not found`);
    await browser.close();
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
  let checkedNames = 0;

  for (const profile of alumniProfiles) {
    if (checkedNames >= 4) break; // Stop after checking 5 names

    const name = await page.evaluate(el => el.innerText.trim(), profile);
    if (name && name !== "Anggota LinkedIn") {
      console.log(`Found alumni: ${name}`);
      names.push(name);

      // Dalam fungsi scrapeLinkedInNames, ganti bagian pengecekan PDDikti dengan ini:
      const result = await checkAlumniStatus(name);
      if (result.isFromEsaUnggul) {
        if (result.isAlumni) {
          console.log(`${name} adalah alumni dari Universitas Esa Unggul.`);
        } else {
          console.log(`${name} adalah mahasiswa Universitas Esa Unggul. Status saat ini: ${result.status}`);
        }
      } else {
        console.log(`${name} bukan dari Universitas Esa Unggul.`);
      }

      checkedNames++; // Increment the checked names counter
    }
  }

  console.log("No valid alumni profile found.");
  await browser.close();
  return null;
};

module.exports = { scrapeLinkedInNames };
