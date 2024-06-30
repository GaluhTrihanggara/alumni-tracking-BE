const puppeteer = require("puppeteer");

const checkAlumniStatus = async (alumniName) => {
  const webUrl = "https://pddikti.kemdikbud.go.id/";
  const inputFieldSelector = "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";
  const selectedAlumniNameSelector = '#root > div > main > div > section > div > div:nth-child(7) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a';
  const resultsSelector = "#root > div > main > div > section > div > div:nth-child(7) > div > div > div > table > tbody > tr";
  const statusSelector = '#root > div > main > div > section > div > div:nth-child(1) > div > div > table > tbody > tr:nth-child(10) > td:nth-child(3)';

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--start-maximized' // Membuka browser dalam mode fullscreen
    ],
    defaultViewport: null // Menonaktifkan viewport default
  });
  const page = await browser.newPage();
  await page.goto(webUrl);
  await page.waitForTimeout(1000);

  await page.waitForSelector(inputFieldSelector);
  await page.type(inputFieldSelector, alumniName, { delay: 100 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

   const selectedAlumniName = async () => {
    await page.evaluate(async (selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, selectedAlumniNameSelector);
  };

  await selectedAlumniName();
  await page.waitForTimeout(2000);

   // Check if the name is from Universitas Esa Unggul
  const results = await page.$$(resultsSelector);
  let isFromEsaUnggul = false;
  let foundUniversity = "";

  for (const result of results) {
    const university = await result.$eval('td:nth-child(3)', node => node.innerText.trim());
    if (university === 'UNIVERSITAS ESA UNGGUL') {
      isFromEsaUnggul = true;
      foundUniversity = university;
      break;
    }
  }

  if (!isFromEsaUnggul) {
    await browser.close();
    return { isFromEsaUnggul: false, isAlumni: false, university: "Bukan dari Universitas Esa Unggul" };
  }
  
  await page.click(selectedAlumniNameSelector);
  await page.waitForTimeout(2000);

  // Scroll to the status
  await page.evaluate(() => {
    window.scrollBy(0, 100);
  });
  await page.waitForTimeout(1000);

   // Check the current student status
  const statusElement = await page.$(statusSelector);
  const status = await page.evaluate(el => el.innerText.trim(), statusElement);

  let isAlumni = status.toLowerCase() === 'lulus';

  await browser.close();
  
  return {
    isFromEsaUnggul: true,
    isAlumni: isAlumni,
    university: foundUniversity,
    status: status
  };
};

module.exports = { checkAlumniStatus };
