// controllers/kolaborasiAlumniController.js
const { Kolaborasi_Alumni, Alumni } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  // Alumni mengajukan data baru
  submitNewAlumni: async (req, res) => {
    try {
      const newAlumniData = req.body;
      const createdKolaborasi = await Kolaborasi_Alumni.create(newAlumniData);
      
      res.status(201).json({
        message: 'Data alumni baru berhasil diajukan dan menunggu persetujuan admin',
        data: createdKolaborasi
      });
    } catch (error) {
      console.error('Error submitting new alumni:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengajukan data alumni baru', error: error.message });
    }
  },

  // Admin melihat pengajuan yang pending
  getPendingSubmissions: async (req, res) => {
    try {
      const pendingSubmissions = await Kolaborasi_Alumni.findAll({
        where: { status: 'Pending' }
      });
      
      res.status(200).json({
        message: 'Daftar pengajuan alumni yang pending',
        data: pendingSubmissions
      });
    } catch (error) {
      console.error('Error fetching pending submissions:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pengajuan', error: error.message });
    }
  },

  // Admin menyetujui atau menolak pengajuan
  processSubmission: async (req, res) => {
    try {
      const { id, action } = req.body; // action bisa 'approve' atau 'reject'
      
      if (!id || !action) {
        return res.status(400).json({ message: 'ID dan action diperlukan' });
      }

      const submission = await Kolaborasi_Alumni.findByPk(id);
      if (!submission) {
        return res.status(404).json({ message: 'Pengajuan tidak ditemukan' });
      }

      if (action === 'approve') {
        // Pindahkan data ke tabel Alumni
        const { id: kolaborasiId, status, createdAt, updatedAt, ...alumniData } = submission.toJSON();
        const hashedPassword = await bcrypt.hash(alumniData.password, 10);
        
        await Alumni.create({ ...alumniData, password: hashedPassword });
        await submission.update({ status: 'Approved' });
        
        res.status(200).json({ message: 'Pengajuan disetujui dan data ditambahkan ke tabel Alumni' });
      } else if (action === 'reject') {
        await submission.update({ status: 'Rejected' });
        res.status(200).json({ message: 'Pengajuan ditolak' });
      } else {
        res.status(400).json({ message: 'Action tidak valid' });
      }
    } catch (error) {
      console.error('Error processing submission:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat memproses pengajuan', error: error.message });
    }
  }
};