const express = require('express');
const cors = require('cors');
const alumniRoutes = require('./routes/alumniRoutes');
const scraperRoutes = require('./routes/scraperRoutes');
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 3000;
// Use the cors middleware
app.use(cors());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "Alumni"
})

db.connect(err => {
    if(err){
        return err;
    }
})

console.log(db)

// Routes
const alumniRouter = express.Router();
const scraperRouter = express.Router();

// Masukkan route-route Anda di sini
alumniRouter.get('/', (req, res) => {
  res.send('Hello from alumniRoutes!');
});

scraperRouter.get('/', (req, res) => {
  res.send('Hello from scraperRoutes!');
});

// Gunakan ini setelah semua route telah ditambahkan
app.use('/', alumniRouter);
app.use('/', scraperRouter);

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