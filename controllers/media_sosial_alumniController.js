// mediaSosialAlumniController.js
const { Media_Sosial_Alumni } = require("../models");

module.exports = {
  getMediaSosialAlumnis: async (req, res) => {
    try {
      const mediaSosialAlumnis = await Media_Sosial_Alumni.findAll();
      res.json(mediaSosialAlumnis);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving media sosial alumnis" });
    }
  },

  getMediaSosialAlumniById: async (req, res) => {
    try {
      const id = req.params.id;
      const mediaSosialAlumni = await Media_Sosial_Alumni.findByPk(id);
      if (mediaSosialAlumni) {
        res.json(mediaSosialAlumni);
      } else {
        res.status(404).json({ message: "Media sosial alumni not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving media sosial alumni" });
    }
  },

  createMediaSosialAlumni: async (req, res) => {
    try {
      const mediaSosialAlumni = await Media_Sosial_Alumni.create(req.body);
      res.status(201).json(mediaSosialAlumni);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating media sosial alumni" });
    }
  },

  updateMediaSosialAlumni: async (req, res) => {
    try {
      const id = req.params.id;
      const mediaSosialAlumni = await Media_Sosial_Alumni.findByPk(id);
      if (mediaSosialAlumni) {
        await mediaSosialAlumni.update(req.body);
        res.json(mediaSosialAlumni);
      } else {
        res.status(404).json({ message: "Media sosial alumni not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating media sosial alumni" });
    }
  },

  deleteMediaSosialAlumni: async (req, res) => {
    try {
      const id = req.params.id;
      const mediaSosialAlumni = await Media_Sosial_Alumni.findByPk(id);
      if (mediaSosialAlumni) {
        await mediaSosialAlumni.destroy();
        res.json({ message: "Media sosial alumni deleted successfully" });
      } else {
        res.status(404).json({ message: "Media sosial alumni not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting media sosial alumni" });
    }
  },

  getMediaSosialByAlumniId: async (req, res) => {
    try {
      const alumniId = req.params.id;
      if (!alumniId) {
        return res.status(400).json({ pesan: "ID Alumni diperlukan" });
      }

      const mediaSosialAlumni = await Media_Sosial_Alumni.findAll({
        where: { Alumni_ID: alumniId },
      });

      if (mediaSosialAlumni.length === 0) {
        return res
          .status(404)
          .json({
            pesan: "Tidak ditemukan catatan media sosial untuk alumni ini",
          });
      }

      res.json(mediaSosialAlumni);
    } catch (error) {
      console.error("Kesalahan dalam getMediaSosialByAlumniId:", error);
      res.status(500).json({
        pesan: "Terjadi kesalahan saat mengambil data media sosial alumni",
        kesalahan: error.message,
      });
    }
  },
};
