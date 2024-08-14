// adminController.js
const { Admin, Submission_Change, Alumni, Program_Studi, Media_Sosial_Alumni, Media_Sosial } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

module.exports = {

getAdmins: async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving admins' });
  }
},

getAdminById: async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByPk(id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving admin' });
  }
},

updateAdmin: async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByPk(id);
    if (admin) {
      await admin.update(req.body);
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating admin' });
  }
},

deleteAdmin: async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByPk(id);
    if (admin) {
      await admin.destroy();
      res.json({ message: 'Admin deleted successfully' });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting admin' });
  }
},

  createAdmin: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if admin with this email already exists
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin with this email already exists' });
      }

      // Create new admin
      const newAdmin = await Admin.create({
        name,
        email,
        password // password will be hashed by the beforeCreate hook in the model
      });

      // Remove password from the response
      const adminResponse = newAdmin.toJSON();
      delete adminResponse.password;

      res.status(201).json({
        message: 'Admin created successfully',
        admin: adminResponse
      });
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
  },

 loginAdmin: async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      process.env.SECRET_KEY,
      { expiresIn: '5h' }
    );

    res.json({
      message: 'Login successful',
      token: token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: 'admin' // Ensure role is included
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const admin = req.user; // Diasumsikan middleware auth menyimpan data admin di req.user

      // Verifikasi password saat ini
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password saat ini tidak cocok" });
      }

      // Hash password baru
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await Admin.update(
        { password: hashedPassword },
        { where: { id: admin.id } }
      );
      res.json({ message: "Password berhasil diubah" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan saat mengubah password" });
    }
  },
 adminSearchAlumni: async (req, res) => {
     try {
       const { query, fromYear, toYear, programStudi } = req.query;

       // Build the search conditions
       let searchConditions = {
         nama: {
           [Op.like]: `%${query}%`
         }
       };

       // Add filter for Program Studi if provided
       if (programStudi) {
         searchConditions['$Program_Studi.name$'] = programStudi;
       }

       // Add filter for Tahun Masuk if provided
       if (fromYear && toYear) {
         searchConditions.tahun_masuk = {
           [Op.between]: [fromYear, toYear]
         };
       }

       const alumni = await Alumni.findAll({
         where: searchConditions,
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
         ],
         limit: 10
       });

       res.json(alumni);
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Error searching alumni" });
     }
   },


getAlumniByNameSlug: async (req, res) => {
  try {
    const { nameSlug } = req.params;
    const alumni = await Alumni.findOne({
      where: {
        nama: {
          [Op.like]: nameSlug.replace(/-/g, ' ')
        }
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

 getAdminProfile: async (req, res) => {
    try {
      const adminId = req.user.id; // Diasumsikan middleware auth menyimpan data admin di req.user
      const admin = await Admin.findByPk(adminId, {
        attributes: ['id', 'name', 'email'] // Hanya ambil field yang diperlukan
      });
      
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.json(admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching admin profile" });
    }
  },

updateAdminProfile: async (req, res) => {
    try {
      const adminId = req.user.id; // Diasumsikan middleware auth menyimpan data admin di req.user
      const { name, email } = req.body;

      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Update nama dan email
      await admin.update({ name, email });

      // Ambil data yang sudah diupdate
      const updatedAdmin = await Admin.findByPk(adminId, {
        attributes: ['id', 'name', 'email']
      });

      res.json(updatedAdmin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating admin profile" });
    }
  }
};