const express = require('express');
const {
  uploadMedicalData,
  getMedicalData,
  getMedicalDataById,
  deleteMedicalDataById
} = require('../controllers/medicalDataController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/:id/medical-data', authenticate, authorize(['Doctor']), uploadMedicalData);
router.get('/:id/medical-data', authenticate, authorize(['Doctor', 'Admin']), getMedicalData);
router.get('/:id/medical-data/:recordId', authenticate, authorize(['Doctor', 'Admin']), getMedicalDataById);
router.delete('/:id/medical-data/:recordId', authenticate, authorize(['Admin']), deleteMedicalDataById);

module.exports = router;
