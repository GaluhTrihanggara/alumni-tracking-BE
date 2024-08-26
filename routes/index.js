const express = require("express");
const route = express.Router();
const authRoutes = require("./auth-route");
const adminRoutes = require("./admin-route");
const alumniRoutes = require("./alumni-route");
const kolaborasiAlumniRoutes = require("./kolaborasi-alumni-route");
const mediaSosialRoutes = require("./media-sosial-route");
const mediaSosialAlumniRoutes = require("./media-sosial-alumni-route");
const programStudiRoutes = require("./program-studi-route");
const scraperRoutes = require("./scraper-route");
const imageRoutes = require("./image-route");
const submissionChangeRoutes = require("./submission-change-route");

route.use("/auth", authRoutes);
route.use("/admin", adminRoutes);
route.use("/alumni", alumniRoutes);
route.use("/kolaborasi-alumni", kolaborasiAlumniRoutes);
route.use("/media-sosial", mediaSosialRoutes);
route.use("/media-sosial-alumni", mediaSosialAlumniRoutes);
route.use("/program-studi", programStudiRoutes);
route.use("/scrape", scraperRoutes);
route.use("/image", imageRoutes);
route.use("/submission-changes", submissionChangeRoutes);

module.exports = route;