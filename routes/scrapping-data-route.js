const express = require('express');
const authenticateAdmin = require('../middleware/adminAuth');
const route = express.Router();
const {
    createScrappingData,
    getScrappingDatas,
    getScrappingDataById,
    updateScrappingData,
    deleteScrappingData
} = require("../controllers/scrapping_dataController");

route.post("/", authenticateAdmin, createScrappingData);
route.get("/", authenticateAdmin, getScrappingDatas);
route.get("/:id", authenticateAdmin, getScrappingDataById);
route.put("/:id", authenticateAdmin, updateScrappingData);
route.delete("/:id", authenticateAdmin, deleteScrappingData);

module.exports = route;