import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddJob() {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    salary: '',
    description: '',
    company: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`, formData);
      alert('Job added successfully!');
      navigate('/jobs'); // Redirect to jobs page
    } catch (error) {
      console.error('Failed to add job:', error);
      alert('Error adding job. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            className="w-full border border-gray-300 rounded-md p-3 text-black"
              placeholder="e.g., Frontend Developer"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 text-black"
              placeholder="e.g., Engineering"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 text-black"
              placeholder="e.g., Bangalore"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Salary (₹)</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 text-black"
              placeholder="e.g., 1200000"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 text-black"
              placeholder="Describe the role and responsibilities"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700">Company</label>
            <select
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 text-black"
            >
              <option value="">Select Company</option>
              <option value="Google">Google</option>
              <option value="Amazon">Amazon</option>
              <option value="Adobe">Adobe</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}
