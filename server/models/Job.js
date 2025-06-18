const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    location: { type: String },
    salary: { type: String },
    company: { type: String },
    type: { type: String }, // Full-time, Part-time, etc.
}, { timestamps: true });

module.exports = mongoose.model('JOBS', jobSchema, 'JOBS');
