import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // ✅ Import this

export default function Dashboard() {
  const [bookings, setBookings] = useState({});
  const [selectedCompany, setSelectedCompany] = useState("All");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookings')) || {};
    setBookings(saved);
  }, []);

  const bookingsArray = Object.values(bookings);
  const companies = Array.from(new Set(bookingsArray.map(b => b.company)));
  const filtered = selectedCompany === "All"
    ? bookingsArray
    : bookingsArray.filter(b => b.company === selectedCompany);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-rose-100 via-indigo-100 to-blue-100 px-6 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        📋 Application Dashboard
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        <a href="/add" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
          ➕ Add Candidate
        </a>
        <a href="/candidates" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
          👥 View Candidates
        </a>
      </div>

      <div className="flex justify-center mb-6">
        <select
          className="px-4 py-2 rounded border shadow bg-white"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="All">All Companies</option>
          {companies.map((company, idx) => (
            <option key={idx} value={company}>{company}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          {selectedCompany === "All"
            ? "You haven’t applied for any jobs yet."
            : `No applications for ${selectedCompany}.`}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((booking, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{booking.title}</h2>
              <p className="text-gray-700 mb-1"><strong>Company:</strong> {booking.company}</p>
              <p className="text-gray-600 mb-1"><strong>Email:</strong> {booking.email}</p>
              <p className="text-gray-600 mb-2"><strong>Resume:</strong> {booking.resumeName}</p>
              <p className="text-green-700 font-medium bg-green-100 px-3 py-2 rounded">
                ✅ {booking.status}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
