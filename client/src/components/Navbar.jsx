import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-pink-100 via-indigo-100 to-blue-100 shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">TalentTrack</div>
      <ul className="flex gap-6 text-sm font-medium text-blue-700">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/candidates">Candidates</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/add-job" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
  + Add Job
</Link></li>
      </ul>
    </nav>
  );
}

