const express = require("express");
const route = express.Router();
const {uploadFiles} = require("../controllers/uploadController");
const upload = require("../middleware/upload");

 route.post("/upload", upload.single("file"), uploadFiles);

module.exports = route;