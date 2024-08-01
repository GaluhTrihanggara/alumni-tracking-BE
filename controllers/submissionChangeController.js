const { Submission_Change, Alumni } = require('../models');

module.exports = {
  getAllSubmissionChanges: async (req, res) => {
    try {
      const submissionChanges = await Submission_Change.findAll({
        include: [{ model: Alumni, attributes: ['id', 'nama', 'nomor_induk_mahasiswa'] }]
      });
      const filteredSubmissionChanges = submissionChanges.map(submissionChange => {
        const { id, alumni_id, changes, status } = submissionChange;
        return {
          id,
          alumni_id,
          changes: JSON.parse(changes),
          status
        };
      });
      res.json(filteredSubmissionChanges);
    } catch (error) {
      res.status(500).json({ message: "Error fetching submission changes", error: error.message });
    }
  }
};
