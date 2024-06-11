const express = require('express');
const authenticate = require('../middleware/auth');
const route = express.Router();
const {
    createScrappingHistory,
    getScrappingHistories,
    getScrappingHistoryById,
    updateScrappingHistory,
    deleteScrappingHistory
} = require("../controllers/scrapping_historiesController");

route.post("/", authenticate, createScrappingHistory);
route.get("/", authenticate, getScrappingHistories);
route.get("/:id", authenticate, getScrappingHistoryById);
route.put("/:id", authenticate, updateScrappingHistory);
route.delete("/:id", authenticate, deleteScrappingHistory);

module.exports = route;