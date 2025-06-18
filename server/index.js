const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const Candidate = require('./models/Candidate');


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
app.post('/api/candidates', async(req, res) => {
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
});

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
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Candidate API server running at http://localhost:${PORT}`);
});
