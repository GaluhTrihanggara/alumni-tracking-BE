// alumniController.js
const {
  Alumni,
  Program_Studi,
  Media_Sosial_Alumni,
  Media_Sosial,
} = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  searchAlumni: async (req, res) => {
    try {
      const { query, fromYear, toYear, programStudi } = req.query;

      // Build the search conditions
      let searchConditions = {
        nama: {
          [Op.like]: `%${query}%`,
        },
      };

      // Add filter for Program Studi if provided
      if (programStudi) {
        searchConditions["$Program_Studi.name$"] = programStudi;
      }

      // Add filter for Tahun Masuk if provided
      if (fromYear && toYear) {
        searchConditions.tahun_masuk = {
          [Op.between]: [fromYear, toYear],
        };
      }

      const alumni = await Alumni.findAll({
        where: searchConditions,
        attributes: [
          "id",
          "nama",
          "nomor_induk_mahasiswa",
          "program_studi_id",
          "kontak_telephone",
          "jenis_kelamin",
          "perguruan_tinggi",
          "jenjang",
          "tahun_masuk",
          "pekerjaan_saat_ini",
          "nama_perusahaan",
        ],
        include: [
          {
            model: Program_Studi,
            as: "Program_Studi",
            attributes: ["name"],
          },
        ],
        limit: 10,
      });

      res.json(alumni);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error searching alumni" });
    }
  },
  getAlumni: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10; // Jumlah data per halaman
      const page = parseInt(req.query.page) || 1; // Nomor halaman
      const offset = (page - 1) * limit;

      const alumni = await Alumni.findAll({
        limit,
        offset,
      });

      res.json({
        data: alumni,
        pagination: {
          totalData: await Alumni.count(),
          limit,
          page,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving alumni" });
    }
  },

  getAlumniByNameSlug: async (req, res) => {
    try {
      const { nameSlug } = req.params;
      const alumni = await Alumni.findOne({
        where: {
          nama: {
            [Op.like]: nameSlug.replace(/-/g, " "),
          },
        },
        attributes: [
          "id",
          "nama",
          "nomor_induk_mahasiswa",
          "program_studi_id",
          "kontak_telephone",
          "jenis_kelamin",
          "perguruan_tinggi",
          "jenjang",
          "tahun_masuk",
          "status_mahasiswa_saat_ini", // Tambahkan ini
          "pekerjaan_saat_ini",
          "nama_perusahaan",
        ],
        include: [
          {
            model: Program_Studi,
            as: "Program_Studi",
            attributes: ["name"],
          },
          {
            model: Media_Sosial_Alumni,
            include: [{ model: Media_Sosial, as: "Media_Sosial" }],
          },
        ],
      });

      if (!alumni) {
        return res.status(404).json({ message: "Alumni not found" });
      }

      res.status(200).json(alumni);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAlumniById: async (req, res) => {
    try {
      const id = req.params.id;
      const alumni = await Alumni.findByPk(id, {
        include: [{ model: Media_Sosial_Alumni, as: "media_sosial" }],
      });
      if (alumni) {
        res.json(alumni);
      } else {
        res.status(404).json({ message: "Alumni not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving alumni" });
    }
  },

  createAlumni: async (req, res) => {
    try {
      const alumni = await Alumni.create(req.body);
      res.status(201).json({
        message: "Succes to create new alumni",
        data: alumni,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating alumni" });
    }
  },

  updateAlumni: async (req, res) => {
    try {
      const id = req.params.id;
      const alumni = await Alumni.findByPk(id);
      if (alumni) {
        await alumni.update(req.body, {
          include: [{ model: Media_Sosial_Alumni, as: "media_sosial" }],
        });
        res.json(alumni);
      } else {
        res.status(404).json({ message: "Alumni not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating alumni" });
    }
  },

  deleteAlumni: async (req, res) => {
    try {
      const id = req.params.id;
      const alumni = await Alumni.findByPk(id);
      if (alumni) {
        await alumni.destroy();
        res.json({ message: "Alumni deleted successfully" });
      } else {
        res.status(404).json({ message: "Alumni not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting alumni" });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const alumni = req.user; // Diasumsikan middleware auth menyimpan data alumni di req.user

      // Verifikasi password saat ini
      const isMatch = await bcrypt.compare(currentPassword, alumni.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Password saat ini tidak cocok" });
      }

      // Hash password baru
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await Alumni.update(
        { password: hashedPassword },
        { where: { id: alumni.id } }
      );
      res.json({ message: "Password berhasil diubah" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Terjadi kesalahan saat mengubah password" });
    }
  },
};
