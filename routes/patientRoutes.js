const express = require('express');
const {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, authorize(['Doctor', 'Admin']), createPatient);
router.get('/', authenticate, authorize(['Doctor', 'Admin']), getPatients);
router.get('/:id', authenticate, authorize(['Doctor', 'Admin']), getPatient);
router.put('/:id', authenticate, authorize(['Doctor', 'Admin']), updatePatient);
router.delete('/:id', authenticate, authorize(['Admin']), deletePatient);

module.exports = router;
