

const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    skills: {
        type: String,
    },
    experience: {
        type: String,
    },
    role: {
        type: String,
    },
    resume: {
        type: String, // Assume this stores a filename or URL
        default: ""
    },
    company: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model('CANDIDATES', candidateSchema, 'CANDIDATES');
