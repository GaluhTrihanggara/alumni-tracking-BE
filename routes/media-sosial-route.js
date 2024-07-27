const express = require('express');
const authenticateAdmin = require('../middleware/adminAuth');
const route = express.Router();

const {
    createMediaSosial,
    getMediaSosials,
    getMediaSosialById,
    updateMediaSosial,
    deleteMediaSosial
} = require("../controllers/media_sosialController");

route.post("/", authenticateAdmin, createMediaSosial);
route.get("/", authenticateAdmin, getMediaSosials);
route.get("/:id", authenticateAdmin, getMediaSosialById);
route.put("/:id", authenticateAdmin, updateMediaSosial);
route.delete("/:id", authenticateAdmin, deleteMediaSosial);

module.exports = route;