const express = require('express');
const authenticateAdmin = require('../middleware/adminAuth');
const authenticate = require('../middleware/auth');
const route = express.Router();
const {
    createProgramStudi,
    getProgramStudis,
    getProgramStudiById,
    updateProgramStudi,
    deleteProgramStudi
} = require("../controllers/program_studi");

route.post("/", authenticateAdmin, createProgramStudi);
route.get("/", authenticate, getProgramStudis);
route.get("/:id", authenticate ,authenticateAdmin, getProgramStudiById);
route.put("/:id", authenticate, authenticateAdmin, updateProgramStudi);
route.delete("/:id", authenticateAdmin, deleteProgramStudi);

module.exports = route;