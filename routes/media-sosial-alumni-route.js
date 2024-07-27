const express = require('express');
const authenticate = require('../middleware/auth');
const authenticateAdmin = require('../middleware/adminAuth');
const route = express.Router();
const {
    createMediaSosialAlumni,
    getMediaSosialAlumnis,
    getMediaSosialAlumniById,
    getMediaSosialByAlumniId,
    updateMediaSosialAlumni,
    deleteMediaSosialAlumni
} = require("../controllers/media_sosial_alumniController");



route.post("/", authenticate, authenticateAdmin ,createMediaSosialAlumni);
route.get("/", authenticateAdmin, getMediaSosialAlumnis);
route.get("/:id", authenticate, authenticateAdmin ,getMediaSosialAlumniById);
route.get("/:id/alumni", authenticateAdmin, getMediaSosialByAlumniId);
route.put("/:id", authenticate, authenticateAdmin,updateMediaSosialAlumni);
route.delete("/:id", authenticate,authenticateAdmin ,deleteMediaSosialAlumni);

module.exports = route;