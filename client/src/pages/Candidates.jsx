import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/candidates');
      setCandidates(res.data);
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/candidates/${id}`);
      setCandidates((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Failed to delete candidate:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/add?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-indigo-100 to-teal-100 p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Candidate List</h2>

      {candidates.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No candidates added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div key={candidate._id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{candidate.name}</h3>
              <p className="text-sm text-gray-700"><strong>Email:</strong> {candidate.email}</p>
              <p className="text-sm text-gray-700"><strong>Phone:</strong> {candidate.phone}</p>
              <p className="text-sm text-gray-700"><strong>Skills:</strong> {candidate.skills}</p>
              <p className="text-sm text-gray-700"><strong>Experience:</strong> {candidate.experience}</p>
              <p className="text-sm text-gray-700"><strong>Role:</strong> {candidate.role}</p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEdit(candidate._id)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(candidate._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
