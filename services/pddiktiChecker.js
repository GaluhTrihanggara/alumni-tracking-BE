const puppeteer = require("puppeteer");

const checkAlumniStatus = async (alumniName) => {
  const webUrl = "https://pddikti.kemdikbud.go.id/";
  const inputFieldSelector = 'div.flex > input[type="text"]';
  const selectedAlumniNameSelector = 'a[href^="/detail-mahasiswa/"]';
  const resultsSelector = "tbody tr";
  const statusSelector = '#root > div > div.w-full.px-6 > div.max-w-7xl.justify-center.items-center.mx-auto.mt-8 > div > div:nth-child(8) > p.text-lg.font-semibold';

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
  });
  const page = await browser.newPage();

  try {
    await page.goto(webUrl);
    await page.waitForTimeout(1000);
    await page.waitForSelector(inputFieldSelector);
    await page.type(inputFieldSelector, alumniName, { delay: 100 });
    await page.keyboard.press("Enter");

    // Wait for manual reCAPTCHA solving
    console.log("Please solve the reCAPTCHA manually.");
    await page.waitForTimeout(6000); // Wait for 30 seconds for manual solving. Adjust the time as necessary.
    await page.waitForSelector(selectedAlumniNameSelector);

    // Scroll to the search results
    const selectedAlumniName = async () => {
        await page.evaluate(async (selector) => {
          const element = document.querySelector(selector);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, selectedAlumniNameSelector);
      };
      await selectedAlumniName();
      await page.waitForTimeout(3000);

     // Check if the name is from Universitas Esa Unggul
    const results = await page.$$(resultsSelector);
    let isFromEsaUnggul = false;
    let foundUniversity = "";

    for (const result of results) {
      const university = await result.$eval('tbody tr td:nth-child(3)', node => node.innerText.trim());
      if (university === 'UNIVERSITAS ESA UNGGUL') {
        isFromEsaUnggul = true;
        foundUniversity = university;
        break;
      }
    }

    if (!isFromEsaUnggul) {
      return { isFromEsaUnggul: false, isAlumni: false, university: "Tidak ditemukan di Universitas Esa Unggul" };
    }

    // Click on the name to open details
    await page.click(selectedAlumniNameSelector);
    await page.waitForTimeout(5000);

    // Periksa status mahasiswa saat ini
    const statusElement = await page.$(statusSelector);
    if (!statusElement) {
      throw new Error("Elemen status tidak ditemukan di halaman.");
    }
    const status = await page.evaluate(el => el.innerText.trim(), statusElement);

    let isAlumni = status.toLowerCase().startsWith('Lulus');
    let statusShort = isAlumni ? 'Lulus' : 'Aktif';

    return {
      isFromEsaUnggul: true,
      isAlumni: isAlumni,
      university: foundUniversity,
      status: statusShort
    };

  } catch (error) {
    console.error("Error in checkAlumniStatus:", error);
    return { isFromEsaUnggul: false, isAlumni: false, university: "Error saat memeriksa status" };
  } finally {
    await browser.close();
  }
};

module.exports = { checkAlumniStatus };