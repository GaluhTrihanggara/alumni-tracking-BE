// Import Library
const puppeteer = require("puppeteer");
const axios = require("axios");

const postData = async (dataAlumni) => {
  const url = "https://659d4ed9633f9aee790926f7.mockapi.io/alumni";
  const data = dataAlumni;

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const typingSearchInput = async (page, searchText) => {
  const inputSelector =
    "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";

  await page.waitForSelector(inputSelector);
  await page.type(inputSelector, searchText, {
    delay: 100,
  });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
};

const scrapingWeb = async () => {
  // Initialize Variable
  const webUrl = "https://pddikti.kemdikbud.go.id/";
  const inputFieldSelector =
    "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";
  const selectedAlumniNameSelector =
    "#root > div > main > div > section > div > div:nth-child(7) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a";
  const biodataSelector =
    "#root > div > main > div > section > div > div:nth-child(1) > div";

  // Initialize Browser
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  // Go to Web based on URL
  await page.goto(webUrl);
  await page.waitForTimeout(1000);

  // Wait for Input Field & Type alumni name
  await page.waitForSelector(inputFieldSelector);

  const insideAlumniNamesToBeScrap = [
    "Novrianta Zuhry Sembiring Universitas Esa Unggul",
    "Galuh Trihanggara Universitas Esa Unggul",
  ];

  for (const [index, name] of insideAlumniNamesToBeScrap.entries()) {
    await typingSearchInput(page, name);
    await page.waitForTimeout(1000);

    // Scroll until the "Name" is in view
    await page.evaluate(async (selector) => {
      const element = document.querySelector(selector);
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, selectedAlumniNameSelector);

    // Wait and click when selector is exist
    await page.waitForTimeout(2000);
    await page.waitForSelector(selectedAlumniNameSelector);
    await page.click(selectedAlumniNameSelector);
    await page.waitForTimeout(2000);

    // Input alumni's name into an object
    const biodata = await page.$$eval(biodataSelector, (rows) => {
      let data = {};

      data.nama = rows[0].querySelector(
        "div > div > table > tbody > tr:nth-child(2) > td:nth-child(3)"
      ).innerText;
      data.jenis_kelamin = rows[0].querySelector(
        "div > div > table > tbody > tr:nth-child(3) > td:nth-child(3)"
      ).innerText;
      data.perguruan_tinggi = rows[0].querySelector(
        "div > div > table > tbody > tr:nth-child(4) > td:nth-child(3)"
      ).innerText;
      data.program_studi = rows[0].querySelector(
        "div > div > table > tbody > tr:nth-child(5) > td:nth-child(3)"
      ).innerText;
      data.jenjang = rows[0].querySelector(
        "div > div > table > tbody > tr:nth-child(6) > td:nth-child(3)"
      ).innerText;
      data.nomor_induk_mahasiswa = rows[0].querySelector(
        "div > div > table > tbody > tr:nth-child(7) > td:nth-child(3)"
      ).innerText;
      data.semester_awal = rows[0].querySelector(
        "div > div > table > tbody > tr:nth-child(8) > td:nth-child(3)"
      ).innerText;
      data.status_mahasiswa_saat_ini = rows[0].querySelector(
        "div > table > tbody > tr:nth-child(10) > td:nth-child(3)"
      ).innerText;

      return data;
    });

    postData(biodata);

    console.log("Continue This Loop");
  }

  console.log("Selesai Looping");
  await browser.close();
};

scrapingWeb();
