require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const allRoutes = require("./routes"); // Menggunakan index.js secara otomatis
const scraperRoutes = require("./routes/scraper-route");
const mysql = require('mysql');
const app = express();
const port = 3000;

// Use the cors middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Use the combined routes
app.use('/api', allRoutes); // Menambahkan prefix '/api' ke semua routes
app.use('/api', scraperRoutes); // Prefix for scraper routes

// Default route for the root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`App is listening on: http://localhost:${port}/`);
  }
});


// app.listen(port, () =>
//   console.log(`app is listening on : http://localhost:${port}/alumni`)
// );

// //Get All Data
// app.get("/alumni", async (req, res) => {
//   try {
//     console.log("Making axios call");
//     const response = await axios.get(url);
//     res.status(200).json({ data: response.data });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "something bad has occurred." });
//   }
// });

// //Get data by id
// app.get("/alumni:id", async (req, res) => {
//   try {
//     let postId = req.params.id;
//     console.log("Making axios call with post id= " + postId);
//     const response = await axios.get(url + "/" + postId);
//     res.status(200).json({ data: response.data });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "something bad has occurred." });
//   }
// });