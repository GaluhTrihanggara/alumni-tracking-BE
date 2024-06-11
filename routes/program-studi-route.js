const express = require('express');
const authenticate = require('../middleware/auth');
const route = express.Router();
const {
    createProgramStudi,
    getProgramStudis,
    getProgramStudiById,
    updateProgramStudi,
    deleteProgramStudi
} = require("../controllers/program_studi");

route.post("/", authenticate, createProgramStudi);
route.get("/", authenticate, getProgramStudis);
route.get("/:id", authenticate, getProgramStudiById);
route.put("/:id", authenticate, updateProgramStudi);
route.delete("/:id", authenticate, deleteProgramStudi);

module.exports = route;