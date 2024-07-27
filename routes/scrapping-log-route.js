const express = require('express');
const authenticateAdmin = require('../middleware/adminAuth');
const route = express.Router();
const {
    createScrappingLog,
    getScrappingLogs,
    getScrappingLogById,
    updateScrappingLog,
    deleteScrappingLog
} = require("../controllers/scrapping_logController");

route.post("/", authenticateAdmin, createScrappingLog);
route.get("/", authenticateAdmin, getScrappingLogs);
route.get("/:id", authenticateAdmin, getScrappingLogById);
route.put("/:id", authenticateAdmin, updateScrappingLog);
route.delete("/:id", authenticateAdmin, deleteScrappingLog);

module.exports = route;