const { MedicalData } = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

exports.uploadMedicalData = [
  upload.single('file'),
  async (req, res) => {
    const { id } = req.params;
    const { description, date } = req.body;
    try {
      const medicalData = await MedicalData.create({
        date,
        description,
        filePath: req.file.path,
        patientId: id
      });
      res.status(201).json(medicalData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.getMedicalData = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalData = await MedicalData.findAll({ where: { patientId: id } });
    res.json(medicalData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMedicalDataById = async (req, res) => {
  const { recordId } = req.params;
  try {
    const medicalData = await MedicalData.findByPk(recordId);
    if (!medicalData) {
      return res.status(404).json({ message: 'Medical data not found' });
    }
    res.json(medicalData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMedicalDataById = async (req, res) => {
  const { recordId } = req.params;
  try {
    const medicalData = await MedicalData.findByPk(recordId);
    if (!medicalData) {
      return res.status(404).json({ message: 'Medical data not found' });
    }
    fs.unlinkSync(medicalData.filePath);
    await medicalData.destroy();
    res.json({ message: 'Medical data deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
