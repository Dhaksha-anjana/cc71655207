const Candidate = require('../models/Candidate');

exports.getAll = async (req, res) => {
    const candidates = await Candidate.find();
    res.json(candidates);
};

exports.getById = async (req, res) => {
    const candidate = await Candidate.findById(req.params.id);
    res.json(candidate);
};

exports.create = async (req, res) => {
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(201).json(newCandidate);
};

exports.update = async (req, res) => {
    const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.remove = async (req, res) => {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Candidate deleted' });
};
