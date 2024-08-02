const { Submission_Change, Alumni, Media_Sosial_Alumni } = require("../models");

module.exports = {
  getAllSubmissionChanges: async (req, res) => {
    try {
      const submissionChanges = await Submission_Change.findAll({
        include: [
          {
            model: Alumni,
            attributes: ["id", "nama", "nomor_induk_mahasiswa"],
          },
        ],
      });
      const filteredSubmissionChanges = submissionChanges.map(
        (submissionChange) => {
          const { id, alumni_id, changes, status } = submissionChange;
          return {
            id,
            alumni_id,
            changes: JSON.parse(changes),
            status,
          };
        }
      );
      res.json(filteredSubmissionChanges);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching submission changes",
        error: error.message,
      });
    }
  },

  getPendingSubmissions: async (req, res) => {
    try {
      const submissions = await Submission_Change.findAll({
        where: { status: "Pending" },
        include: [
          {
            model: Alumni,
            attributes: ["id", "nama", "nomor_induk_mahasiswa"],
          },
        ],
      });

      res.status(200).json(submissions);
    } catch (error) {
      console.error("Error fetching pending submissions:", error);
      res.status(500).json({
        message: "Error fetching pending submissions",
        error: error.message,
      });
    }
  },

  approveProfileChanges: async (req, res) => {
    const { id } = req.params;
    try {
      const submissionChange = await Submission_Change.findByPk(id);

      if (!submissionChange) {
        return res.status(404).json({ message: "Submission not found" });
      }
      if (submissionChange.status === "Approved") {
        return res
          .status(400)
          .json({ message: "Submission Change is already approved" });
      }
      const changes = JSON.parse(submissionChange.changes);
      const alumni = await Alumni.findByPk(submissionChange.alumni_id);
      // Update the submission status
      if (!alumni) {
        return res.status(404).json({ message: "Alumni not found" });
      }

      // Perbarui profil alumni
    for (const key in changes) {
      if (key === 'Media_Sosial_Alumnis') {
        // Hapus media sosial yang ada
        await Media_Sosial_Alumni.destroy({ where: { alumni_id: alumni.id } });

        // Tambahkan media sosial baru
        for (const media of changes[key]) {
          await Media_Sosial_Alumni.create({
            alumni_id: alumni.id,
            media_sosial_id: media.media_sosial_id,
            link: media.link
          });
        }
      } else {
        alumni[key] = changes[key];
      }
    }

    await alumni.save();

      // Update the status of the submission change
      submissionChange.status = "Approved";
      await submissionChange.save();

      res.status(200).json({ message: "Profile changes approved and applied" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while approving the submission change",
      });
    }
  },
  rejectSubmissionChange: async (req, res) => {
    const { id } = req.params;

    try {
      const submissionChange = await Submission_Change.findByPk(id);

      if (!submissionChange) {
        return res.status(404).json({ message: "Submission Change not found" });
      }

      if (submissionChange.status === "Rejected") {
        return res
          .status(400)
          .json({ message: "Submission Change is already rejected" });
      }

      // Update the status of the submission change
      submissionChange.status = "Rejected";
      await submissionChange.save();

      res.status(200).json({ message: "Profile changes rejected" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while rejecting the submission change",
      });
    }
  },
};
