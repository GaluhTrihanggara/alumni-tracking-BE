require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {Alumni} = require("../models");

module.exports = {
    loginAction: async (req, res) => {
        const alumniLogin = req.body;

        try {
            const alumni = await Alumni.findOne({
                where: {
                    nomor_induk_mahasiswa: alumniLogin.nomor_induk_mahasiswa,
                },
            });

            if (!alumni) {
                return res.status(404).json({
                    message: "NIM or Password Failed",
                });
            }
            
            if (bcrypt.compareSync(alumniLogin.password, alumni.password)) {
                const token = jwt.sign(
                    {id: alumni.id, nomor_induk_mahasiswa: alumni.nomor_induk_mahasiswa},
                    process.env.SECRET_KEY
                );

                res.status(200).json({
                    message: "Login Successfull",
                    alumniId: alumni.id,
                    token: token,
                });
            } else {
                res.status (401).json({
                    message: "Login Failed",
                });
            }
        } catch (error) {
            res.status(505).json(error.message);
        }
    },

    registerAction: async (req, res) => {
        let data = req.body;

        try {
            const hashPassword = bcrypt.hashSync(data.password, 10);
            data.password = hashPassword;
        
            await Alumni.create(data);
            
            res.status(201).json({
                message: "Success to create new alumni",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }
};