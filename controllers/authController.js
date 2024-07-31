const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { Alumni, Program_Studi, Media_Sosial_Alumni, Media_Sosial } = require("../models");
const { UniqueConstraintError } = require("sequelize");

module.exports = {
    loginAction: async (req, res) => {
        const { nomor_induk_mahasiswa, password } = req.body;

        if (!nomor_induk_mahasiswa || !password) {
            return res.status(400).json({
                message: "NIM and Password are required",
            });
        }

        try {
            const alumni = await Alumni.findOne({
                where: {
                    nomor_induk_mahasiswa: nomor_induk_mahasiswa,
                },
            });

            if (!alumni) {
                return res.status(404).json({
                    message: "NIM or Password is incorrect",
                });
            }

            const passwordIsValid = await bcrypt.compare(password, alumni.password);
            if (passwordIsValid) {
                const token = jwt.sign(
                    { id: alumni.id, nomor_induk_mahasiswa: alumni.nomor_induk_mahasiswa },
                    process.env.SECRET_KEY,
                    { expiresIn: '1h' }
                );

                res.status(200).json({
                    message: "Login Successful",
                    alumniId: alumni.id,
                    token: token,
                });
            } else {
                res.status(401).json({
                    message: "NIM or Password is incorrect",
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    registerAction: async (req, res) => {
        const { nama, nomor_induk_mahasiswa, password } = req.body;

        if (!nama || !nomor_induk_mahasiswa || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        try {
            const newAlumni = await Alumni.create({
                nama,
                nomor_induk_mahasiswa,
                password,
                status_mahasiswa_saat_ini: "Lulus", // Nilai default
                perguruan_tinggi: "Universitas Esa Unggul" // Nilai default
            });

            res.status(201).json({
                message: "Successfully created new alumni",
                alumni: {
                    id: newAlumni.id,
                    nama: newAlumni.nama,
                    nomor_induk_mahasiswa: newAlumni.nomor_induk_mahasiswa,
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: "NIM already exists",
                    error: error.message
                });
            }
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    },

    getProfile: async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const alumni = await Alumni.findOne({
            where: {
                id: decoded.id,
            },
            include: [
                { model: Program_Studi, as: "Program_Studi" },
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

    updateProfile: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const { id, nomor_induk_mahasiswa } = req.user;
      const { program_studi_id, Media_Sosial_Alumnis, ...otherFields } = req.body;

      const alumni = await Alumni.findOne({ where: { nomor_induk_mahasiswa } });
      if (!alumni) {
        return res.status(404).json({ message: "Alumni not found" });
      }

      await alumni.update({
        ...otherFields,
        program_studi_id: program_studi_id,
      });

      // Delete existing media sosial records
      await Media_Sosial_Alumni.destroy({ where: { alumni_id: alumni.id } });

      // Create new media sosial records
      if (Media_Sosial_Alumnis && Media_Sosial_Alumnis.length > 0) {
        const mediaSosialAlumniData = Media_Sosial_Alumnis.map((media) => ({
          alumni_id: alumni.id,
          media_sosial_id: media.media_sosial_id,
          link: media.link,
        }));
        await Media_Sosial_Alumni.bulkCreate(mediaSosialAlumniData);
      }

      // Fetch the updated alumni data including the Program_Studi and Media_Sosial_Alumnis
      const updatedAlumni = await Alumni.findOne({
        where: { nomor_induk_mahasiswa },
        include: [
          { model: Program_Studi, as: "Program_Studi" },
          {
            model: Media_Sosial_Alumni,
            include: [{ model: Media_Sosial, as: "Media_Sosial" }],
          },
        ],
      });

      res.json(updatedAlumni);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating profile" });
    }
  },
};
