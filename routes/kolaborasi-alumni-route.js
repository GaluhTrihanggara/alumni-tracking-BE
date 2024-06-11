const express = require('express');
const authenticate = require('../middleware/auth');
const route = express.Router();
const {
    createKolaborasiAlumni,
    getKolaborasiAlumnis,
    getKolaborasiAlumniById,
    getKolaborasiAlumniByNim,
    getKolaborasiAlumniByPerguruanTinggi,
    updateKolaborasiAlumni,
    deleteKolaborasiAlumni
} = require("../controllers/kolaborasi_alumniController")

route.post("/", authenticate, createKolaborasiAlumni);
route.get("/", authenticate, getKolaborasiAlumnis);
route.get("/:id", authenticate, getKolaborasiAlumniById);
route.get("/:id/nim", authenticate, getKolaborasiAlumniByNim);
route.get("/:id/perguruan-tinggi", authenticate, getKolaborasiAlumniByPerguruanTinggi);
route.put("/:id", authenticate, updateKolaborasiAlumni);
route.delete("/:id", authenticate, deleteKolaborasiAlumni);

module.exports = route;