// kolaborasiAlumniController.js
const { kolaborasi_alumni } = require('../models');

module.exports = {
getKolaborasiAlumnis: async (req, res) => {
  try {
    const kolaborasiAlumnis = await kolaborasi_alumni.findAll();
    res.json(kolaborasiAlumnis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving kolaborasi alumnis' });
  }
},

getKolaborasiAlumniById: async (req, res) => {
  try {
    const id = req.params.id;
    const kolaborasiAlumni = await kolaborasi_alumni.findByPk(id);
    if (kolaborasiAlumni) {
      res.json(kolaborasiAlumni);
    } else {
      res.status(404).json({ message: 'Kolaborasi alumni not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving kolaborasi alumni' });
  }
},

createKolaborasiAlumni: async (req, res) => {
  try {
    const kolaborasiAlumni = await kolaborasi_alumni.create(req.body);
    res.status(201).json(kolaborasiAlumni);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating kolaborasi alumni' });
  }
},

updateKolaborasiAlumni: async (req, res) => {
  try {
    const id = req.params.id;
    const kolaborasiAlumni = await kolaborasi_alumni.findByPk(id);
    if (kolaborasiAlumni) {
      await kolaborasiAlumni.update(req.body);
      res.json(kolaborasiAlumni);
    } else {
      res.status(404).json({ message: 'Kolaborasi alumni not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating kolaborasi alumni' });
  }
},

deleteKolaborasiAlumni: async (req, res) => {
  try {
    const id = req.params.id;
    const kolaborasiAlumni = await kolaborasi_alumni.findByPk(id);
    if (kolaborasiAlumni) {
      await kolaborasiAlumni.destroy();
      res.json({ message: 'Kolaborasi alumni deleted successfully' });
    } else {
      res.status(404).json({ message: 'Kolaborasi alumni not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting kolaborasi alumni' });
  }
},

getKolaborasiAlumniByNim: async (req, res) => {
  try {
    const nim = req.params.nim;
    const kolaborasiAlumnis = await kolaborasi_alumni.findAll({ where: { Nomor_Induk_Mahasiswa: nim } });
    res.json(kolaborasiAlumnis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving kolaborasi alumnis by NIM' });
  }
},

getKolaborasiAlumniByPerguruanTinggi: async (req, res) => {
  try {
    const perguruanTinggi = req.params.perguruanTinggi;
    const kolaborasiAlumnis = await kolaborasi_alumni.findAll({ where: { perguruan_tinggi: perguruanTinggi } });
    res.json(kolaborasiAlumnis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving kolaborasi alumnis by perguruan tinggi' });
  }
},
}