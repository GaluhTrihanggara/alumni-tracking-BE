const puppeteer = require("puppeteer");

const scrapeLinkedInProfile = async (alumniName) => {
  const webUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(alumniName)}`;
  const profileSelector = '#ember4967'; // Selector for profile link
  const pekerjaan_saat_ini = '#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-md.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section.artdeco-card.vxqYChsuCUThyAOoBoViKaTMkZPKKjKVUjgWS > div.ph5.pb5 > div.mt2.relative > div:nth-child(1) > div.text-body-medium.break-words'; // Selector for current job info
  const nama_perusahaan = '#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-md.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section.artdeco-card.vxqYChsuCUThyAOoBoViKaTMkZPKKjKVUjgWS > div.ph5.pb5 > div.mt2.relative > ul > li:nth-child(1) > button > span > div'; // Selector for company name


  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  await page.goto(webUrl, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000);

  // Click on the first profile that appears
  const profileExists = await page.$(profileSelector);
  if (!profileExists) {
    await browser.close();
    return null;
  }
  await page.click(profileSelector);
  await page.waitForTimeout(2000);

  // Get profile details
  const name = alumniName;
  const currentJob = await page.$eval(pekerjaan_saat_ini, el => el.innerText);
  const company = await page.$eval(nama_perusahaan, el => el.innerText);

  const profileData = {
    name,
    pekerjaan_saat_ini,
    nama_perusahaan,
  };

  await browser.close();
  return profileData;
};

module.exports = { scrapeLinkedInProfile };
