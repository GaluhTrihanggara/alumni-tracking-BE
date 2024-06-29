const puppeteer = require("puppeteer");

const checkAlumniStatus = async (alumniName) => {
  const webUrl = "https://pddikti.kemdikbud.go.id/";
  const inputFieldSelector = "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";
  const resultsSelector = "#root > div > main > div > section > div > div:nth-child(7) > div > div > div > table > tbody > tr";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  await page.goto(webUrl);
  await page.waitForTimeout(1000);

  await page.waitForSelector(inputFieldSelector);
  await page.type(inputFieldSelector, alumniName, { delay: 100 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  // Get the rows of the search results
  const results = await page.$$(resultsSelector);
  let isAlumni = false;
  let foundUniversity = "";

  for (const result of results) {
    const university = await result.$eval('td:nth-child(3)', node => node.innerText.trim());
    if (university === 'UNIVERSITAS ESA UNGGUL') {
      isAlumni = true;
      foundUniversity = university;
      break;
    } else {
      foundUniversity = university;
    }
  }

  await browser.close();
  
  if (isAlumni) {
    return { isAlumni: true, university: foundUniversity };
  } else {
    return { isAlumni: false, university: foundUniversity };
  }
};

module.exports = { checkAlumniStatus };
