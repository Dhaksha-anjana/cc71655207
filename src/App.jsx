import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Candidates from './pages/Candidates';
import AddCandidate from './pages/AddCandidate';
import Jobs from './pages/Jobs';
import Company from './pages/Company';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/add" element={<AddCandidate />} />
        <Route path="/jobs" element={<Jobs />}/>
        <Route path="/company" element={<Company />} />

      </Routes>
    </Router>
  );
}
