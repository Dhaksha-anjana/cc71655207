const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String },
    industry: { type: String },
    location: { type: String },
    website: { type: String },
    logo: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('COMPANIES', companySchema, 'COMPANIES');
