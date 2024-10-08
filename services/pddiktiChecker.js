const puppeteer = require("puppeteer");
const { Alumni_Sementara, Program_Studi } = require("../models");

function cleanName(name) {
  // Menghapus titik di akhir nama
  name = name.replace(/\.$/, '');
  // Menghapus karakter khusus dan angka
  name = name.replace(/[^a-zA-Z\s]/g, '');
  // Menghapus spasi berlebih
  name = name.replace(/\s+/g, ' ').trim();
  // Mengubah huruf pertama setiap kata menjadi kapital
  name = name.replace(/\b\w/g, c => c.toUpperCase());
  // Menambahkan "Universitas Esa Unggul" di belakang nama
  return `${name} Universitas Esa Unggul`;
}

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

    const newAlumni = await Alumni_Sementara.create({
      program_studi_id: programStudiId,
      nama: dataAlumni.nama,
      nomor_induk_mahasiswa: dataAlumni.nomor_induk_mahasiswa,
      kontak_telephone: dataAlumni.kontak_telephone,
      password: dataAlumni.password,
      jenis_kelamin: dataAlumni.jenis_kelamin.toLowerCase(),
      perguruan_tinggi: dataAlumni.perguruan_tinggi,
      jenjang: dataAlumni.jenjang,
      tahun_masuk: dataAlumni.tahun_masuk,
      status_mahasiswa_saat_ini: dataAlumni.status_mahasiswa_saat_ini,
      pekerjaan_saat_ini: dataAlumni.pekerjaan_saat_ini,
      nama_perusahaan: dataAlumni.nama_perusahaan,
      status: 'Pending' // Set status to Pending
    });

    if (newAlumni) {
      console.log("Data Alumni Sementara Created:", newAlumni);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const checkAndScrapeAlumni = async (alumniName) => {
  const cleanedName = cleanName(alumniName);
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
    await page.type(inputFieldSelector, cleanedName, alumniName, { delay: 100 });
    await page.keyboard.press("Enter");

    console.log("Please solve the reCAPTCHA manually.");
    await page.waitForTimeout(20000); // Wait for manual solving
    await page.waitForSelector(selectedAlumniNameSelector);

    await page.evaluate(async (selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, selectedAlumniNameSelector);
    await page.waitForTimeout(3000);

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
      return { isFromEsaUnggul: false, isAlumni: false, university: "Tidak ditemukan di Universitas Esa Unggul" };
    }

    await page.click(selectedAlumniNameSelector);
    await page.waitForTimeout(5000);

    const statusElement = await page.$(statusSelector);
    if (!statusElement) {
      throw new Error("Elemen status tidak ditemukan di halaman.");
    }
    const status = await page.evaluate(el => el.innerText.trim(), statusElement);

    let isAlumni = false;
    let statusShort = "Tidak Diketahui";
    if (status.toLowerCase().includes('lulus')) {
      isAlumni = true;
      statusShort = 'Lulus';
    } else if (status.toLowerCase().includes('aktif')) {
      statusShort = 'Aktif';
    } else if (status.toLowerCase().includes('cuti')) {
      statusShort = 'Cuti';
    }

    let alumniData = null;
    if (isAlumni) {
      alumniData = await page.evaluate(() => {
        const getData = (selector) => {
          const element = document.querySelector(selector);
          return element ? element.innerText.trim() : "N/A";
        };

        return {
          nama: getData('div.max-w-7xl div:nth-child(1) p.text-lg.font-semibold'),
          jenis_kelamin: getData('div.max-w-7xl div:nth-child(3) p.text-lg.font-semibold'),
          perguruan_tinggi: getData('div.max-w-7xl div:nth-child(2) p.text-lg.font-semibold'),
          program_studi: getData('div.max-w-7xl div:nth-child(6) p.text-lg.font-semibold span.cursor-pointer'),
          jenjang: getData('div.max-w-7xl div:nth-child(6) p.text-lg.font-semibold span:first-child'),
          nomor_induk_mahasiswa: getData('div.max-w-7xl div:nth-child(5) p.text-lg.font-semibold'),
          tahun_masuk: getData('div.max-w-7xl div:nth-child(4) p.text-lg.font-semibold'),
          status_mahasiswa_saat_ini: getData('div.max-w-7xl div:nth-child(8) p.text-lg.font-semibold')
        };
      });

      if (alumniData) {
        await postData(alumniData);
        console.log(`Successfully scraped and saved data for ${alumniName}`);
      }
    }

    return {
      isFromEsaUnggul: true,
      isAlumni: isAlumni,
      university: foundUniversity,
      status: statusShort,
      alumniData: alumniData
    };

  } catch (error) {
    console.error(`Error in checkAndScrapeAlumni for ${alumniName}:`, error);
    return { isFromEsaUnggul: false, isAlumni: false, university: "Error saat memeriksa status dan mengambil data" };
  } finally {
    await browser.close();
  }
};

module.exports = { checkAndScrapeAlumni };
