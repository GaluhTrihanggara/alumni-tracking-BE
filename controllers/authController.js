require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Alumni } = require("../models");

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

            const passwordIsValid = bcrypt.compareSync(password, alumni.password);
            if (passwordIsValid) {
                const token = jwt.sign(
                    { id: alumni.id, nomor_induk_mahasiswa: alumni.nomor_induk_mahasiswa },
                    process.env.SECRET_KEY,
                    { expiresIn: '1h' } // Token expires in 1 hour
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

        try {
            await Alumni.create(data);

            res.status(201).json({
                message: "Successfully created new alumni",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }
};
