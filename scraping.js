// Import Library
const puppeteer = require("puppeteer");

const typingSearchInput = async (page, searchText) => {
  const inputSelector =
    "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";

  await page.waitForSelector(inputSelector);
  await page.type(inputSelector, searchText, { delay: 100 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
};

const scrapingWeb = async () => {
  // Initialize Variable
  const webUrl = "https://pddikti.kemdikbud.go.id/";
  const alumniName = "Novrianta Zuhry Sembiring Universitas Esa Unggul";
  const inputFieldSelector =
    "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";
  const selectedAlumniNameSelector =
    "#root > div > main > div > section > div > div:nth-child(7) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a";
  const biodataSelector =
    "#root > div > main > div > section > div > div:nth-child(1) > div";

  // Initialize Browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  // Go to Web based on URL
  await page.goto(webUrl);
  await page.waitForTimeout(1000);

  // Wait for Input Field & Type alumni name
  await page.waitForSelector(inputFieldSelector);
  await typingSearchInput(page, alumniName);
  await page.waitForTimeout(1000);

  // Scroll until the "Name" is in view
  await page.evaluate(async (selector) => {
    const element = document.querySelector(selector);
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, selectedAlumniNameSelector);

  // Wait and click when selector is exist
  await page.waitForTimeout(2000);
  await page.waitForSelector(selectedAlumniNameSelector);
  await page.click(selectedAlumniNameSelector);
  await page.waitForTimeout(2000);

  // Input alumni's name into an object
  const biodata = await page.$$eval(biodataSelector, (rows) => {
    let data = {};

    data.Nama = rows[0].querySelector(
      "div > div > table > tbody > tr:nth-child(2) > td:nth-child(3)"
    ).innerText;
    data.Jenis_Kelamin = rows[0].querySelector(
      "div > div > table > tbody > tr:nth-child(3) > td:nth-child(3)"
    ).innerText;
    data.Perguruan_Tinggi = rows[0].querySelector(
      "div > div > table > tbody > tr:nth-child(4) > td:nth-child(3)"
    ).innerText;
    data.Program_Studi = rows[0].querySelector(
      "div > div > table > tbody > tr:nth-child(5) > td:nth-child(3)"
    ).innerText;
    data.Jenjang = rows[0].querySelector(
      "div > div > table > tbody > tr:nth-child(6) > td:nth-child(3)"
    ).innerText;
    data.Nomor_Induk_Mahasiswa = rows[0].querySelector(
      "div > div > table > tbody > tr:nth-child(7) > td:nth-child(3)"
    ).innerText;
    data.Semester_Awal = rows[0].querySelector(
      "div > div > table > tbody > tr:nth-child(8) > td:nth-child(3)"
    ).innerText;
    data.Status_Mahasiswa_Saat_ini = rows[0].querySelector(
      "div > table > tbody > tr:nth-child(10) > td:nth-child(3)"
    ).innerText;

    return data;
  });

  // POST alumni biodata here
  console.log("POST REQUEST with this Body: ", biodata);

  await browser.close();
};

scrapingWeb();

// 2nd Way | Fast Way
// const getSearchURL = (searchText) => {
//   const baseSearchURL = "https://pddikti.kemdikbud.go.id/search/";
//   // Convert searchText to a string, replace spaces with "%20", and convert to lowercase
//   const formattedSearchText = String(searchText)
//     .replace(/ /g, "%20")
//     .toLowerCase();
//   return `${baseSearchURL}${formattedSearchText}`;
// };
// const searchURL = getSearchURL(name);
// await page.goto(searchURL);
