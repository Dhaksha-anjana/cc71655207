import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b shadow-sm">
      <div className="font-bold text-xl text-black">TalentTrack</div>
      <ul className="flex gap-6 text-sm">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/candidates">Candidates</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
      <div className ="flex"></div>
    </nav>
  )
}
