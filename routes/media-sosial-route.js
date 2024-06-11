const express = require('express');
const authenticate = require('../middleware/auth');
const route = express.Router();

const {
    createMediaSosial,
    getMediaSosials,
    getMediaSosialById,
    updateMediaSosial,
    deleteMediaSosial
} = require("../controllers/media_sosialController");

route.post("/", authenticate, createMediaSosial);
route.get("/", authenticate, getMediaSosials);
route.get("/:id", authenticate, getMediaSosialById);
route.put("/:id", authenticate, updateMediaSosial);
route.delete("/:id", authenticate, deleteMediaSosial);

module.exports = route;