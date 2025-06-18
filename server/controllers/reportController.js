const Report = require('../models/Report');

exports.getAll = async (req, res) => {
    const reports = await Report.find().populate('candidateId jobId');
    res.json(reports);
};

exports.getById = async (req, res) => {
    const report = await Report.findById(req.params.id).populate('candidateId jobId');
    res.json(report);
};

exports.create = async (req, res) => {
    const newReport = new Report(req.body);
    await newReport.save();
    res.status(201).json(newReport);
};

exports.update = async (req, res) => {
    const updated = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.remove = async (req, res) => {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: 'Report deleted' });
};
