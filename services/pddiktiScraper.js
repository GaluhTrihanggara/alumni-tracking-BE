const puppeteer = require("puppeteer");
const { Alumni, Program_Studi } = require("../models");

const getProgramStudiId = async (programStudiName) => {
  const programStudi = await Program_Studi.findOne({ where: { name: programStudiName } });
  return programStudi ? programStudi.id : null;
};

const postData = async (dataAlumni) => {
  console.log("Data Alumni:", dataAlumni);

  try {
    const programStudiId = await getProgramStudiId(dataAlumni.program_studi);
    if (!programStudiId) {
      throw new Error(`Program Studi not found: ${dataAlumni.program_studi}`);
    }

    const newAlumni = await Alumni.create({
      ...dataAlumni,
      program_studi_id: programStudiId,
      jenis_kelamin: dataAlumni.jenis_kelamin.toLowerCase()
    });

    if (newAlumni) {
      console.log("Success To Create:", newAlumni);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const typingSearchInput = async (page, searchText) => {
  const inputSelector = "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";
  await page.waitForSelector(inputSelector);
  await page.type(inputSelector, searchText, { delay: 100 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
};

const scrapePDDikti = async (alumniNames) => {
  const webUrl = "https://pddikti.kemdikbud.go.id/";
  const inputFieldSelector = "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";
  const selectedAlumniNameSelector = "#root > div > main > div > section > div > div:nth-child(7) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a";
  const biodataSelector = "#root > div > main > div > section > div > div:nth-child(1) > div";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  await page.goto(webUrl);
  await page.waitForTimeout(1000);

  for (const alumniName of alumniNames) {
    console.log(`Scraping data for: ${alumniName}`);

    await page.waitForSelector(inputFieldSelector);

    await typingSearchInput(page, alumniName);
    await page.waitForTimeout(1000);

    const elementExists = await page.$(selectedAlumniNameSelector);
    if (!elementExists) {
      console.log(`Alumni ${alumniName} not found`);
      continue;
    }

    await page.evaluate(async (selector) => {
      const element = document.querySelector(selector);
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }, selectedAlumniNameSelector);

    await page.waitForTimeout(2000);
    await page.waitForSelector(selectedAlumniNameSelector);
    await page.click(selectedAlumniNameSelector);
    await page.waitForTimeout(2000);

    const biodata = await page.$$eval(biodataSelector, (rows) => {
      let data = {};
      data.nama = rows[0].querySelector("div > div > table > tbody > tr:nth-child(2) > td:nth-child(3)").innerText;
      data.jenis_kelamin = rows[0].querySelector("div > div > table > tbody > tr:nth-child(3) > td:nth-child(3)").innerText;
      data.perguruan_tinggi = rows[0].querySelector("div > div > table > tbody > tr:nth-child(4) > td:nth-child(3)").innerText;
      data.program_studi = rows[0].querySelector("div > div > table > tbody > tr:nth-child(5) > td:nth-child(3)").innerText;
      data.jenjang = rows[0].querySelector("div > div > table > tbody > tr:nth-child(6) > td:nth-child(3)").innerText;
      data.nomor_induk_mahasiswa = rows[0].querySelector("div > div > table > tbody > tr:nth-child(7) > td:nth-child(3)").innerText;
      data.semester_awal = rows[0].querySelector("div > div > table > tbody > tr:nth-child(8) > td:nth-child(3)").innerText;
      data.status_mahasiswa_saat_ini = rows[0].querySelector("div > table > tbody > tr:nth-child(10) > td:nth-child(3)").innerText;
      return data;
    });

    await postData(biodata);
    console.log(`Successfully scraped data for ${alumniName}`);
  }

  console.log("Selesai Looping");
  await browser.close();
};

module.exports = { scrapePDDikti };
