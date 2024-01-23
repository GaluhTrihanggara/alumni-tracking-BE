const puppeteer = require("puppeteer");
const webToBeScrap = ["https://linkedin.com", "https://instagram.com"];

const scrapWebsite = async (urlFromItem) => {
  // Launch
  const browser = await puppeteer.launch({
    headless: "new",
  });

  // Open new page
  const page = await browser.newPage();

  // Navigate url
  await page.goto(urlFromItem);

  // Extract information
  const title = await page.title();
  const url = page.url();

  if(urlFromItem == "https://linkedin.com"){
    console.log("Linked Title:", title);
  }

  if(urlFromItem == "https://instagram.com"){
    console.log("Instagram URL:", url);
  }

  // Close the browser
  await browser.close();
};

webToBeScrap.forEach((url) => {
  scrapWebsite(url);
});