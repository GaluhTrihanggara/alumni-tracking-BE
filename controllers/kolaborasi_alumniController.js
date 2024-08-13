// controllers/kolaborasiAlumniController.js
const { Kolaborasi_Alumni, Alumni, Media_Sosial_Alumni } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  // Alumni mengajukan data baru
  submitNewAlumni: async (req, res) => {
  try {
    const newAlumniData = req.body;

    // Validasi nama pengaju
    if (!newAlumniData.pengaju) {
      return res.status(400).json({ message: 'Nama pengaju harus disertakan' });
    }

    newAlumniData.password = await bcrypt.hash("12345", 10);
    
    // Simpan data media sosial dalam kolom media_sosial_data
    if (newAlumniData.mediaSosial && newAlumniData.mediaSosial.length > 0) {
      newAlumniData.media_sosial_data = newAlumniData.mediaSosial;
    }
    
    // Hapus mediaSosial dari newAlumniData karena sudah disimpan di media_sosial_data
    delete newAlumniData.mediaSosial;

    console.log('Data yang akan disimpan:', newAlumniData);

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
        where: { status: "Pending" },
      });

      res.status(200).json({
        message: "Daftar pengajuan alumni yang pending",
        data: pendingSubmissions,
      });
    } catch (error) {
      console.error("Error fetching pending submissions:", error);
      res
        .status(500)
        .json({
          message: "Terjadi kesalahan saat mengambil data pengajuan",
          error: error.message,
        });
    }
  },

  // Admin menyetujui pengajuan
  approveSubmission: async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Kolaborasi_Alumni.findByPk(id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const newAlumni = await Alumni.create({
      nama: submission.nama,
      nomor_induk_mahasiswa: submission.nomor_induk_mahasiswa,
      program_studi_id: submission.program_studi_id,
      kontak_telephone: submission.kontak_telephone,
      jenis_kelamin: submission.jenis_kelamin,
      perguruan_tinggi: submission.perguruan_tinggi,
      jenjang: submission.jenjang,
      tahun_masuk: submission.tahun_masuk,
      status_mahasiswa_saat_ini: submission.status_mahasiswa_saat_ini,
      pekerjaan_saat_ini: submission.pekerjaan_saat_ini,
      nama_perusahaan: submission.nama_perusahaan,
      password: "12345"  // Password plain text yang nanti akan dihash di model hooks
    });

    // Save media social data if exists
    const mediaSocialData = submission.media_sosial_data;
    if (mediaSocialData && mediaSocialData.length > 0) {
      await Promise.all(mediaSocialData.map(media => 
        Media_Sosial_Alumni.create({
          alumni_id: newAlumni.id,
          media_sosial_id: media.media_sosial_id,
          link: media.link
        })
      ));
    }

    // Update submission status
    await submission.update({ status: 'Approved' });

    res.status(200).json({ message: 'Submission approved and new alumni created' });
  } catch (error) {
    console.error('Error approving submission:', error);
    res.status(500).json({ message: 'Error approving submission', error: error.message });
  }
},

  rejectSubmission: async (req, res) => {
    try {
      const { id } = req.params;
      const submission = await Kolaborasi_Alumni.findByPk(id);

      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }

      // Update submission status
      await submission.update({ status: "Rejected" });

      res.status(200).json({ message: "Submission rejected" });
    } catch (error) {
      console.error("Error rejecting submission:", error);
      res
        .status(500)
        .json({ message: "Error rejecting submission", error: error.message });
    }
  },
};
