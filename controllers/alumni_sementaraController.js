const { Alumni_Sementara, Alumni } = require('../models');

const scrapedDataController = {
  // Get all scraped data pending approval
  getAllPendingData: async (req, res) => {
    try {
      const pendingData = await Alumni_Sementara.findAll({ where: { status: 'Pending' } });
      res.json(pendingData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching pending data', error: error.message });
    }
  },

  // Approve scraped data
  approveData: async (req, res) => {
    try {
      const { id } = req.params;
      const scrapedData = await Alumni_Sementara.findByPk(id);
      
      if (!scrapedData) {
        return res.status(404).json({ message: 'Scraped data not found' });
      }

      if (scrapedData.status !== 'Pending') {
        return res.status(400).json({ message: 'This data has already been processed' });
      }

      // Move data to main Alumni table
      await Alumni.create({
        program_studi_id: scrapedData.program_studi_id,
        nama: scrapedData.nama,
        nomor_induk_mahasiswa: scrapedData.nomor_induk_mahasiswa,
        kontak_telephone: scrapedData.kontak_telephone,
        password: scrapedData.password,
        jenis_kelamin: scrapedData.jenis_kelamin,
        perguruan_tinggi: scrapedData.perguruan_tinggi,
        jenjang: scrapedData.jenjang,
        tahun_masuk: scrapedData.tahun_masuk,
        status_mahasiswa_saat_ini: scrapedData.status_mahasiswa_saat_ini,
        pekerjaan_saat_ini: scrapedData.pekerjaan_saat_ini,
        nama_perusahaan: scrapedData.nama_perusahaan
      });

      // Update status to 'Approved'
      await scrapedData.update({ status: 'Approved' });

      res.json({ message: 'Data approved and saved to main database' });
    } catch (error) {
      res.status(500).json({ message: 'Error approving data', error: error.message });
    }
  },

  // Reject scraped data
  rejectData: async (req, res) => {
    try {
      const { id } = req.params;
      const scrapedData = await Alumni_Sementara.findByPk(id);
      
      if (!scrapedData) {
        return res.status(404).json({ message: 'Scraped data not found' });
      }

      if (scrapedData.status !== 'Pending') {
        return res.status(400).json({ message: 'This data has already been processed' });
      }

      // Update status to 'Rejected'
      await scrapedData.update({ status: 'Rejected' });

      res.json({ message: 'Data rejected' });
    } catch (error) {
      res.status(500).json({ message: 'Error rejecting data', error: error.message });
    }
  }
};

module.exports = scrapedDataController;