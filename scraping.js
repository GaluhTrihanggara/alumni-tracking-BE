// const { Sequelize } = require('sequelize')

// // Initialize Sequelize with your database credentials
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql', // Choose the dialect you are using, e.g., 'mysql', 'postgres', 'sqlite', 'mssql'
// });

// // Define the model
// const { alumni } = require('./models'); // Assuming your model is defined in './models.js'

// const postData = async (alumniData) => {
//   try {
//     // Create a new alumni record
//     const newAlumni = await alumni.create(alumniData);

//     // You can add additional logic here if necessary
//     console.log('New alumni record created:', newAlumni);

//     return newAlumni; // Return the created record if needed
//   } catch (error) {
//     console.error('Error creating new alumni record:', error);
//     throw error; // Re-throw the error if you want to handle it further up the call stack
//   }
// };

// const connectDB = async () => {
//   try {
//     // Establish the connection
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

// const main = async () => {
//   try {
//     // Connect to the database
//     await connectDB();

//     // Example usage:
//     const exampleAlumniData = {
//       name: 'John Doe',
//       graduationYear: 2020,
//       // Add other fields as necessary
//     };

//     // Run postData after the connection is established
//     const newAlumni = await postData(exampleAlumniData);
//     console.log('Successfully created:', newAlumni);
//   } finally {
//     // Close the Sequelize connection
//     await sequelize.close();
//     console.log('Connection has been closed.');
//   }
// };

// // Run the main function
// main();


// // const typingSearchInput = async (page, searchText) => {
// //   const inputSelector =
// //     "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";

// //   await page.waitForSelector(inputSelector);
// //   await page.type(inputSelector, searchText, {
// //     delay: 100,
// //   });
// //   await page.keyboard.press("Enter");
// //   await page.waitForTimeout(2000);
// // };

// // const scrapingWeb = async () => {
// //   // Initialize Variable
// //   const webUrl = "https://pddikti.kemdikbud.go.id/";
// //   const inputFieldSelector =
// //     "#sticky-wrapper > div > div:nth-child(1) > div > div.col-md-6.text-center > div > div > div > input";
// //   const selectedAlumniNameSelector =
// //     "#root > div > main > div > section > div > div:nth-child(7) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a";
// //   const biodataSelector =
// //     "#root > div > main > div > section > div > div:nth-child(1) > div";

// //   // Initialize Browser
// //   const browser = await puppeteer.launch({
// //     headless: false,
// //   });
// //   const page = await browser.newPage();
// //   page.setViewport({
// //     width: 1920,
// //     height: 1080,
// //     deviceScaleFactor: 1,
// //   });

// //   // Go to Web based on URL
// //   await page.goto(webUrl);
// //   await page.waitForTimeout(1000);

// //   // Wait for Input Field & Type alumni name
// //   await page.waitForSelector(inputFieldSelector);

// //   const insideAlumniNamesToBeScrap = [
// //     "Novrianta Zuhry Sembiring Universitas Esa Unggul",
// //     "Galuh Trihanggara Universitas Esa Unggul",
// //   ];

// //   for (const [index, name] of insideAlumniNamesToBeScrap.entries()) {
// //     await typingSearchInput(page, name);
// //     await page.waitForTimeout(1000);

// //     // Scroll until the "Name" is in view
// //     await page.evaluate(async (selector) => {
// //       const element = document.querySelector(selector);
// //       element.scrollIntoView({
// //         behavior: "smooth",
// //         block: "center",
// //       });
// //     }, selectedAlumniNameSelector);

// //     // Wait and click when selector is exist
// //     await page.waitForTimeout(2000);
// //     await page.waitForSelector(selectedAlumniNameSelector);
// //     await page.click(selectedAlumniNameSelector);
// //     await page.waitForTimeout(2000);

// //     // Input alumni's name into an object
// //     const biodata = await page.$$eval(biodataSelector, (rows) => {
// //       let data = {};

// //       data.nama = rows[0].querySelector(
// //         "div > div > table > tbody > tr:nth-child(2) > td:nth-child(3)"
// //       ).innerText;
// //       data.jenis_kelamin = rows[0].querySelector(
// //         "div > div > table > tbody > tr:nth-child(3) > td:nth-child(3)"
// //       ).innerText;
// //       data.perguruan_tinggi = rows[0].querySelector(
// //         "div > div > table > tbody > tr:nth-child(4) > td:nth-child(3)"
// //       ).innerText;
// //       data.program_studi = rows[0].querySelector(
// //         "div > div > table > tbody > tr:nth-child(5) > td:nth-child(3)"
// //       ).innerText;
// //       data.jenjang = rows[0].querySelector(
// //         "div > div > table > tbody > tr:nth-child(6) > td:nth-child(3)"
// //       ).innerText;
// //       data.nomor_induk_mahasiswa = rows[0].querySelector(
// //         "div > div > table > tbody > tr:nth-child(7) > td:nth-child(3)"
// //       ).innerText;
// //       data.semester_awal = rows[0].querySelector(
// //         "div > div > table > tbody > tr:nth-child(8) > td:nth-child(3)"
// //       ).innerText;
// //       data.status_mahasiswa_saat_ini = rows[0].querySelector(
// //         "div > table > tbody > tr:nth-child(10) > td:nth-child(3)"
// //       ).innerText;

// //       return data;
// //     });

// //     postData(biodata);

// //     console.log("Continue This Loop");
// //   }

// //   console.log("Selesai Looping");
// //   await browser.close();
// // };

// // scrapingWeb();