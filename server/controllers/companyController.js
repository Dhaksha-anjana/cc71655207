const Company = require('../models/Company');

exports.getAll = async (req, res) => {
    const companies = await Company.find();
    res.json(companies);
};

exports.getById = async (req, res) => {
    const company = await Company.findById(req.params.id);
    res.json(company);
};

exports.create = async (req, res) => {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
};

exports.update = async (req, res) => {
    const updated = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.remove = async (req, res) => {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: 'Company deleted' });
};
