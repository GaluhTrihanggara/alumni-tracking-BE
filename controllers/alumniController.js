// alumniController.js
const { Alumni, Program_Studi, Media_Sosial_Alumni } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  searchAlumni: async (req, res) => {
  try {
    const { query } = req.query;
    const alumni = await Alumni.findAll({
      where: {
        nama: {
          [Op.like]: `${query}%`
        }
      },
      attributes: [
        'id', 
        'nama',
        'nomor_induk_mahasiswa',
        'program_studi_id',
        'kontak_telephone',
        'jenis_kelamin',
        'perguruan_tinggi',
        'jenjang',
        'tahun_masuk',
        'pekerjaan_saat_ini',
        'nama_perusahaan',
      ],
      include: [
        {
          model: Program_Studi,
          as: 'Program_Studi',
          attributes: ['name']
        },
        {
          model: Media_Sosial_Alumni,
          as: 'Media_Sosial',
          attributes: ['media_sosial_id', 'link'],
          include: [
            {
              model: Media_Sosial,
              attributes: ['name']
            }
          ]
        }
      ],
      limit: 10
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

  getAlumniById: async (req, res) => {
    try {
      const id = req.params.id;
      const alumni = await Alumni.findByPk(id);
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
        await alumni.update(req.body);
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
      return res.status(400).json({ message: "Password saat ini tidak cocok" });
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
    res.status(500).json({ message: "Terjadi kesalahan saat mengubah password" });
  }
},
};
