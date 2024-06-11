const express = require('express');
const authenticate = require('../middleware/auth');
const route = express.Router();
const {
    createScrappingLog,
    getScrappingLogs,
    getScrappingLogById,
    updateScrappingLog,
    deleteScrappingLog
} = require("../controllers/scrapping_logController");

route.post("/", authenticate, createScrappingLog);
route.get("/", authenticate, getScrappingLogs);
route.get("/:id", authenticate, getScrappingLogById);
route.put("/:id", authenticate, updateScrappingLog);
route.delete("/:id", authenticate, deleteScrappingLog);

module.exports = route;