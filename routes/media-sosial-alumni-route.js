const express = require('express');
const authenticate = require('../middleware/auth');
const route = express.Router();
const {
    createMediaSosialAlumni,
    getMediaSosialAlumnis,
    getMediaSosialAlumniById,
    getMediaSosialAlumniByAlumniId,
    getMediaSosialAlumniByMediaSosialId,
    updateMediaSosialAlumni,
    deleteMediaSosialAlumni
} = require("../controllers/media_sosial_alumniController");


route.post("/", authenticate, createMediaSosialAlumni);
route.get("/", authenticate, getMediaSosialAlumnis);
route.get("/:id", authenticate, getMediaSosialAlumniById);
route.get("/:id/alumni", authenticate, getMediaSosialAlumniByAlumniId);
route.get("/:id/media-sosial", authenticate, getMediaSosialAlumniByMediaSosialId);
route.put("/:id", authenticate, updateMediaSosialAlumni);
route.delete("/:id", authenticate, deleteMediaSosialAlumni);

module.exports = route;