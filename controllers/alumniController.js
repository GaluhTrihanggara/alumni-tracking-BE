// alumniController.js
const { Alumni } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
// Route to registration alumni
// register: async (req, res) => {
//   try {
//     const {  
//       nama,
//       nomor_induk_mahasiswa,
//       kontak_telephone,
//       password,
//       jenis_kelamin,
//       perguruan_tinggi,
//       program_studi,
//       jenjang,
//       semester_awal,
//       status_mahasiswa_saat_ini,
//       pekerjaan_saat_ini,
//       nama_perusahaan,
//       alamat_perusahaan } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const alumni = await Alumni.create({ 
//       nama,
//       nomor_induk_mahasiswa,
//       kontak_telephone,
//       password: hashedPassword, 
//       jenis_kelamin,  
//       perguruan_tinggi, 
//       program_studi, 
//       jenjang,
//       semester_awal,
//       status_mahasiswa_saat_ini,
//       pekerjaan_saat_ini,
//       nama_perusahaan,
//       alamat_perusahaan });
//     res.status(201).json({ message: 'Registration successful.', data: alumni });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error during registration.' });
//   }
// },

// alumniLogin: async (req, res) => {
//   try {
//     const { nomor_induk_mahasiswa, password } = req.body;
//     const alumni = await Alumni.findOne({ where: { nomor_induk_mahasiswa } });
//     if (!alumni || !(await bcrypt.compare(password, alumni.password))) {
//       return res.status(401).json({ message: 'Invalid NIM or password.' });
//     }
//     const token = jwt.sign({ nomor_induk_mahasiswa: alumni.nomor_induk_mahasiswa, role: alumni.role }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ message: 'Login successful.', token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error during login.' });
//   }
// },

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
    res.status(500).json({ message: 'Error retrieving alumni' });
  }
},

getAlumniById: async (req, res) => {
  try {
    const id = req.params.id;
    const alumni = await Alumni.findByPk(id);
    if (alumni) {
      res.json(alumni);
    } else {
      res.status(404).json({ message: 'Alumni not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving alumni' });
  }
},

createAlumni: async (req, res) => {
  try {
    const alumni = await Alumni.create(req.body);
    res.status(201).json({
      message: "Succes to create new alumni",
      data: alumni
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating alumni' });
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
      res.status(404).json({ message: 'Alumni not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating alumni' });
  }
},

deleteAlumni: async (req, res) => {
  try {
    const id = req.params.id;
    const alumni = await Alumni.findByPk(id);
    if (alumni) {
      await alumni.destroy();
      res.json({ message: 'Alumni deleted successfully' });
    } else {
      res.status(404).json({ message: 'Alumni not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting alumni' });
  }
},
}