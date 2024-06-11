const express = require('express');
const authenticate = require('../middleware/auth');
const route = express.Router();
const {
    createScrappingData,
    getScrappingDatas,
    getScrappingDataById,
    updateScrappingData,
    deleteScrappingData
} = require("../controllers/scrapping_dataController");

route.post("/", authenticate, createScrappingData);
route.get("/", authenticate, getScrappingDatas);
route.get("/:id", authenticate, getScrappingDataById);
route.put("/:id", authenticate, updateScrappingData);
route.delete("/:id", authenticate, deleteScrappingData);

module.exports = route;