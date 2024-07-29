require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const allRoutes = require("./routes"); // Menggunakan index.js secara otomatis
const scraperRoutes = require("./routes/scraper-route");
const scraperDataRoutes = require("./routes/scraped-data-route");
const mysql = require('mysql');
const app = express();
const port = 3000;

// Use the cors middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Use the combined routes
app.use('/api', allRoutes); // Menambahkan prefix '/api' ke semua routes
app.use('/api', scraperRoutes);
app.use('/api', scraperDataRoutes);

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