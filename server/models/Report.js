const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'CANDIDATES' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JOBS' },
    status: { type: String }, // e.g., 'Interview Scheduled', 'Selected'
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('REPORTS', reportSchema, 'REPORTS');
