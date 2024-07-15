const express = require("express");
const route = express.Router();
const authRoutes = require("./auth-route");
const adminRoutes = require("./admin-route");
const alumniRoutes = require("./alumni-route");
const kolaborasiAlumniRoutes = require("./kolaborasi-alumni-route");
const mediaSosialRoutes = require("./media-sosial-route");
const mediaSosialAlumniRoutes = require("./media-sosial-alumni-route");
const programStudiRoutes = require("./program-studi-route");
const scrappingDataRoutes = require("./scrapping-data-route");
const scrappingHistoryRoutes = require("./scrapping-history-route");
const scrappinglogRoutes = require("./scrapping-log-route");
const scraperRoutes = require("./scraper-route");

route.use("/auth", authRoutes);
route.use("/admin", adminRoutes);
route.use("/alumni", alumniRoutes);
route.use("/kolaborasi-alumni", kolaborasiAlumniRoutes);
route.use("/media-sosial", mediaSosialRoutes);
route.use("/media-sosial-alumni", mediaSosialAlumniRoutes);
route.use("/program-studi", programStudiRoutes);
route.use("/scrapping-data", scrappingDataRoutes);
route.use("/scrapping-history", scrappingHistoryRoutes);
route.use("/scrapping-log", scrappinglogRoutes);
route.use("/scrape", scraperRoutes);

module.exports = route;