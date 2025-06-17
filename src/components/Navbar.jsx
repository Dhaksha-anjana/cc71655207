import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-gradient-to-r from-rose-100 via-indigo-100 to-blue-100">
      <div className="font-bold text-xl text-gray-800">TalentTrack</div>
      <ul className="flex gap-6 text-sm text-blue-700 font-medium">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/candidates">Candidates</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </nav>
  );
}
