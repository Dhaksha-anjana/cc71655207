const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const Candidate = require('./models/Candidate');
const JOBS_PATH = path.join(__dirname, 'data', 'jobs.json');

const readJobs = () => JSON.parse(fs.readFileSync(JOBS_PATH, 'utf8'));
const writeJobs = (data) => fs.writeFileSync(JOBS_PATH, JSON.stringify(data, null, 2));


// Create path to candidate data
const DATA_PATH = path.join(__dirname, 'data', 'candidates.json');

app.use(cors());
app.use(express.json());

// Helper functions
const readCandidates = () => JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

const writeCandidates = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

// Default route
app.get('/', (req, res) => {
  res.send('Candidate API is running');
});

// Get all candidates
app.get('/api/candidates', (req, res) => {
  try {
    const candidates = readCandidates();
    res.json(candidates);
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ message: 'Error reading candidates data' });
  }
});

// Get a specific candidate by ID
app.get('/api/candidates/:id', (req, res) => {
  try {
    const candidates = readCandidates();
    const candidate = candidates.find(c => c.id === parseInt(req.params.id));
    if (candidate) {
      res.json(candidate);
    } else {
      res.status(404).json({ message: 'Candidate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidate' });
  }
});

// Create a new candidate
app.post('/api/candidates', (req, res) => {
  try {
    const candidates = readCandidates();
    const newCandidate = { ...req.body, id: Date.now() };
    candidates.push(newCandidate);
    writeCandidates(candidates);
    res.status(201).json(newCandidate);
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ message: 'Error creating candidate' });
  }
});
/*app.post('/api/candidates', async(req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
     await newCandidate.save();
     res.status(201).json(newCandidate);
    // const candidates = readCandidates();
    // const newCandidate = { ...req.body, id: Date.now() };
    // candidates.push(newCandidate);
    // writeCandidates(candidates);
    // res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Error creating candidate' });
  }
});*/

// Update a candidate
app.put('/api/candidates/:id', (req, res) => {
  try {
    let candidates = readCandidates();
    const id = parseInt(req.params.id);
    candidates = candidates.map(c =>
      c.id === id ? { ...c, ...req.body } : c
    );
    writeCandidates(candidates);
    res.json({ message: 'Candidate updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating candidate' });
  }
});

// Delete a candidate
app.delete('/api/candidates/:id', (req, res) => {
  try {
    let candidates = readCandidates();
    candidates = candidates.filter(c => c.id !== parseInt(req.params.id));
    writeCandidates(candidates);
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting candidate' });
  }
});

// Handle undefined routes
// Get all jobs
app.get('/api/jobs', (req, res) => {
  try {
    const jobs = readJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error reading job data' });
  }
});

// Add a new job
app.post('/api/jobs', (req, res) => {
  try {
    const jobs = readJobs();
    const newJob = { id: Date.now(), ...req.body };
    jobs.push(newJob);
    writeJobs(jobs);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job' });
  }
});

// Delete a job
app.delete('/api/jobs/:id', (req, res) => {
  try {
    let jobs = readJobs();
    jobs = jobs.filter(job => job.id !== parseInt(req.params.id));
    writeJobs(jobs);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
});
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Candidate and Job API server running at http://localhost:${PORT}`);
});
