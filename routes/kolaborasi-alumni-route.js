// routes/kolaborasiAlumniRoutes.js
const express = require('express');
const router = express.Router();
const {
    submitNewAlumni,
    getPendingSubmissions,
    approveSubmission,
    rejectSubmission
} = require('../controllers/kolaborasi_alumniController');
const authenticateAdmin = require('../middleware/adminAuth');
const authenticate = require('../middleware/auth'); // Asumsikan Anda memiliki middleware ini

// Route untuk alumni mengajukan data baru
router.post('/submit', authenticate, submitNewAlumni);

// Route untuk admin melihat pengajuan yang pending
router.get('/pending', authenticateAdmin, getPendingSubmissions);

router.post('/:id/approve', authenticateAdmin, approveSubmission);
router.post('/:id/reject', authenticateAdmin, rejectSubmission);

module.exports = router;