const express = require('express');
const authenticateAdmin = require('../middleware/adminAuth');
const route = express.Router();
const {
    createProgramStudi,
    getProgramStudis,
    getProgramStudiById,
    updateProgramStudi,
    deleteProgramStudi
} = require("../controllers/program_studi");

route.post("/", authenticateAdmin, createProgramStudi);
route.get("/", authenticateAdmin, getProgramStudis);
route.get("/:id", authenticateAdmin, getProgramStudiById);
route.put("/:id", authenticateAdmin, updateProgramStudi);
route.delete("/:id", authenticateAdmin, deleteProgramStudi);

module.exports = route;