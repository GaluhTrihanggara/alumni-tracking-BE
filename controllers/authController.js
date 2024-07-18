const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { Alumni } = require("../models");
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
        let data = req.body;

        // Basic validation
        const requiredFields = ['nama', 'nomor_induk_mahasiswa', 'password', 'program_studi_id'];
        for (let field of requiredFields) {
            if (!data[field]) {
                return res.status(400).json({
                    message: `${field} is required`
                });
            }
        }

        try {
            const newAlumni = await Alumni.create(data);

            const responseData = {
                id: newAlumni.id,
                program_studi_id: newAlumni.program_studi_id,
                nama: newAlumni.nama,
                nomor_induk_mahasiswa: newAlumni.nomor_induk_mahasiswa,
                kontak_telephone: newAlumni.kontak_telephone,
                jenis_kelamin: newAlumni.jenis_kelamin,
                perguruan_tinggi: newAlumni.perguruan_tinggi,
                jenjang: newAlumni.jenjang,
                tahun_masuk: newAlumni.tahun_masuk,
                status_mahasiswa_saat_ini: newAlumni.status_mahasiswa_saat_ini,
                pekerjaan_saat_ini: newAlumni.pekerjaan_saat_ini,
                nama_perusahaan: newAlumni.nama_perusahaan,
            };

            res.status(201).json({
                message: "Successfully created new alumni",
                alumni: responseData
            });
        } catch (error) {
            console.error('Registration error:', error);
            if (error instanceof UniqueConstraintError) {
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
    }
};