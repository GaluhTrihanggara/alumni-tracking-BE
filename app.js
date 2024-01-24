const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const url = "https://65afc6f92f26c3f2139bba28.mockapi.io/alumni"

//Get All Data
app.get("/api/data", async (req, res) => {
  try {
    console.log("Making axios call");
    const response = await axios.get(url);
    res.status(200).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something bad has occurred." });
  }
});

//Get data by id
app.get("/:id", async (req, res) => {
  try {
    let postId = req.params.id;
    console.log("Making axios call with post id= " + postId);
    const response = await axios.get(url + "/" + postId);
    res.status(200).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something bad has occurred." });
  }
});

const port = 3000;
app.listen(port, () =>
  console.log(`app is listening on : http://localhost:${port}`)
);