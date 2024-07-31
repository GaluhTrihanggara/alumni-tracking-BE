const express = require('express');
// const authenticateAdmin = require('../middleware/adminAuth');
const checkAdminRole = require('../middleware/role')
const authenticate = require('../middleware/auth');
const route = express.Router();

const {
    createMediaSosial,
    getMediaSosials,
    getMediaSosialById,
    updateMediaSosial,
    deleteMediaSosial
} = require("../controllers/media_sosialController");

route.post("/", checkAdminRole, createMediaSosial);
route.get("/" ,getMediaSosials);
route.get("/:id", authenticate, getMediaSosialById);
route.put("/:id", authenticate, checkAdminRole, updateMediaSosial);
route.delete("/:id", checkAdminRole, deleteMediaSosial);

module.exports = route;