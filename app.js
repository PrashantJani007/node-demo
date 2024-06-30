//DUE TO SHORTAGE OF TIME HAVE USED DIRECT NAMES FOR ROLE IDENTIFICATION INSTEAD OF MAKE ROLE TABLE
//Run npm i for node_modules and npm run dev to run the project
require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const medicalDataRoutes = require('./routes/medicalDataRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/patients', medicalDataRoutes);

// Error handling middleware
app.use(errorHandler);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
