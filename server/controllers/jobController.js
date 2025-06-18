const Job = require('../models/Job');

exports.getAll = async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
};

exports.getById = async (req, res) => {
    const job = await Job.findById(req.params.id);
    res.json(job);
};

exports.create = async (req, res) => {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
};

exports.update = async (req, res) => {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.remove = async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
};
