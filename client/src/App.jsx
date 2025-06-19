import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Candidates from './pages/Candidates';
import AddCandidate from './pages/AddCandidate';
import Jobs from './pages/Jobs';
import Company from './pages/Company';
import Reports from './pages/Reports';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
export default function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen flex flex-col bg-white overflow-x-hidden">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/add" element={<AddCandidate />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/company" element={<Company />} />
            <Route path="/reports" element={<Reports />} />
             <Route path="/add-job" element={<AddJob />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
