const alumniScraper = require("../services/linkedinScraper");
const { checkAndScrapeAlumni } = require("../services/pddiktiChecker");
const {
  scrapeLinkedInProfiles,
} = require("../services/linkedinProfileScraper");
const { Alumni, Submission_Scrapping_Data, Program_Studi } = require("../models");

module.exports = {
  scrapeWebsite: async (req, res) => {
    try {
      let alumniNames = [];

      // Check if names are provided in the request body
      if (
        req.body &&
        req.body.names &&
        Array.isArray(req.body.names) &&
        req.body.names.length > 0
      ) {
        alumniNames = req.body.names;
      } else {
        // If no names provided, scrape from LinkedIn
        alumniNames = await alumniScraper.scrapeLinkedInNames();
      }

      const results = [];

      for (const name of alumniNames) {
        console.log(`Processing: ${name}`);
        const pddiktiResult = await checkAndScrapeAlumni(name);

        if (pddiktiResult.isFromEsaUnggul) {
          if (pddiktiResult.isAlumni) {
            console.log(
              `${name} is an alumni of Universitas Esa Unggul. Scraping LinkedIn profile...`
            );
            const linkedInProfile = await scrapeLinkedInProfiles(name);
            results.push({
              name,
              pddiktiInfo: pddiktiResult,
              linkedInProfile,
            });
          } else {
            console.log(
              `${name} is a student of Universitas Esa Unggul. Current status: ${pddiktiResult.status}`
            );
            results.push({
              name,
              pddiktiInfo: pddiktiResult,
            });
          }
        } else {
          console.log(`${name} not found in Universitas Esa Unggul database.`);
          results.push({
            name,
            pddiktiInfo: pddiktiResult,
          });
        }
      }

      res
        .status(200)
        .json({ success: true, message: "Scraping successful", data: results });
    } catch (error) {
      console.error("Error scraping website:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  submitScrapedData: async (req, res) => {
  try {
    const { scrapedData } = req.body;
    console.log('Received scraped data:', scrapedData);

    if (!Array.isArray(scrapedData)) {
      return res
        .status(400)
        .json({ success: false, message: "Scraped data must be an array" });
    }

    const submissions = await Promise.all(
      scrapedData.map(async (data) => {
        return await Submission_Scrapping_Data.create({
          name: data.name,
          pddiktiInfo: JSON.stringify(data.pddiktiInfo),
          linkedInProfile: JSON.stringify(data.linkedInProfile),
          status: "pending",
        });
      })
    );

    res.status(200).json({
      success: true,
      message: "Scraped data submitted successfully",
      data: submissions,
    });
  } catch (error) {
    console.error("Error submitting scraped data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
},

  getPendingScrappingData: async (req, res) => {
    try {
      const pendingScrappingData = await Submission_Scrapping_Data.findAll({
        where: { status: "pending" },
      });

      res.status(200).json({ success: true, data: pendingScrappingData });
    } catch (error) {
      console.error("Error fetching pending submissions:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  approveSubmission: async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission_Scrapping_Data.findByPk(id);

    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    const pddiktiInfo = JSON.parse(submission.pddiktiInfo);
    const linkedInProfile = JSON.parse(submission.linkedInProfile);

    // Find the Program_Studi based on the name
    const programStudi = await Program_Studi.findOne({
      where: { name: pddiktiInfo.alumniData.program_studi }
    });

    if (!programStudi) {
      console.error(`Program Studi not found: ${pddiktiInfo.alumniData.program_studi}`);
      return res.status(400).json({ success: false, message: "Program Studi not found" });
    }

    // Create new Alumni record
    const newAlumni = await Alumni.create({
      nama: submission.name,
      nomor_induk_mahasiswa: pddiktiInfo.alumniData.nomor_induk_mahasiswa,
      program_studi_id: programStudi.id, // Use the id of the found Program_Studi
      tahun_masuk: pddiktiInfo.alumniData.tahun_masuk,
      status_mahasiswa_saat_ini: pddiktiInfo.alumniData.status_mahasiswa_saat_ini,
      pekerjaan_saat_ini: linkedInProfile.jobTitle,
      nama_perusahaan: linkedInProfile.companyName,
      password: "12345" // Password plain text yang nanti akan dihash di model hooks
    });

    // Update submission status
    submission.status = "approved";
    await submission.save();

    res.status(200).json({
      success: true,
      message: "Submission approved and alumni created",
      data: newAlumni
    });
  } catch (error) {
    console.error("Error approving submission:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
},

  rejectSubmission: async (req, res) => {
    try {
      const { id } = req.params;
      const submission = await Submission_Scrapping_Data.findByPk(id);

      if (!submission) {
        return res
          .status(404)
          .json({ success: false, message: "Submission not found" });
      }

      // Update submission status
      submission.status = "rejected";
      await submission.save();

      res.status(200).json({ success: true, message: "Submission rejected" });
    } catch (error) {
      console.error("Error rejecting submission:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
