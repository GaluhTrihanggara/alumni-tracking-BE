const express = require('express');
const puppeteer = require("puppeteer");
const mysql = require('mysql');

const app = express();
const port = 3000;


const webToBeScrape = ["https://pddikti.kemdikbud.go.id/"];

const typingSearchInput = async (page, searchText) => {
  const inputSelector =
    "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";
  await page.waitForSelector(inputSelector);
  await page.type(inputSelector, searchText, { delay: 100 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
};

const getSearchURL = (searchText) => {
  const baseSearchURL = "https://pddikti.kemdikbud.go.id/search/";
  // Convert searchText to a string, replace spaces with "%20", and convert to lowercase
  const formattedSearchText = String(searchText)
    .replace(/ /g, "%20")
    .toLowerCase();
  return `${baseSearchURL}${formattedSearchText}`;
};
const scrapingWeb = async (urlFromItem) => {
  let selector =
    "#root > div > main > div > section > div > div:nth-child(7) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a";
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto(urlFromItem);
  await page.waitForTimeout(3000);
  // Wait for the search input field to be available
  await page.waitForSelector(
    "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input"
  );
  const namesToScrape = ["Novrianta Zuhry Sembiring Universitas Esa Unggul", "Galuh Trihanggara Universitas Esa Unggul"];
  const name = namesToScrape;
  await typingSearchInput(page, name);
  await page.waitForTimeout(1000);
  const searchURL = getSearchURL(namesToScrape);
  await page.goto(searchURL);
  
  // Scroll until the desired element is in view
  page.evaluate(async (selector) => {
    const element = document.querySelector(selector);
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, selector);
  await page.waitForTimeout(2000);
  await page.waitForSelector(
    "#root > div > main > div > section > div > div:nth-child(7) > div > div > div > table > tbody > tr > td:nth-child(1) > a"
  );
  await page.click(
    "#root > div > main > div > section > div > div:nth-child(7) > div > div > div > table > tbody > tr > td:nth-child(1) > a"
  );
  await page.waitForTimeout(2000);
   // Scraping data for each name
  const biodataSelector =
    "#root > div > main > div > section > div > div:nth-child(1) > div"; // Sesuaikan selector jika diperlukan
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

  console.log(biodata);

  await browser.close();
};
webToBeScrape.forEach((url) => {
  scrapingWeb(url);
});