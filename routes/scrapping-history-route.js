const express = require('express');
const authenticateAdmin = require('../middleware/adminAuth');
const route = express.Router();
const {
    createScrappingHistory,
    getScrappingHistories,
    getScrappingHistoryById,
    updateScrappingHistory,
    deleteScrappingHistory
} = require("../controllers/scrapping_historiesController");

route.post("/", authenticateAdmin, createScrappingHistory);
route.get("/", authenticateAdmin, getScrappingHistories);
route.get("/:id", authenticateAdmin, getScrappingHistoryById);
route.put("/:id", authenticateAdmin, updateScrappingHistory);
route.delete("/:id", authenticateAdmin, deleteScrappingHistory);

module.exports = route;