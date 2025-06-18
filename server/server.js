const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job_system';

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routes
const candidateRoutes = require('./routes/candidates');
const jobRoutes = require('./routes/jobs');
const companyRoutes = require('./routes/companies');
const reportRoutes = require('./routes/reports');

// Route Middlewares
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/reports', reportRoutes);

// Connect MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
