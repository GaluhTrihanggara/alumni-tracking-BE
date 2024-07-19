// alumniController.js
const { Alumni } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
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
};
