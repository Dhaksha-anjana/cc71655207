import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../components/FormInput';
import axios from 'axios';

export default function AddCandidate() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    skills: '',
    experience: '',
    desiredRole: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const editId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    if (editId) {
      axios.get(`http://localhost:5000/api/candidates/${editId}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error("Failed to load candidate:", err));
    }
  }, [editId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/candidates/${editId}`, formData);
        alert("Candidate updated!");
      } else {
        await axios.post('http://localhost:5000/api/candidates', formData);
        alert("Candidate added!");
      }
      navigate('/candidates');
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit candidate.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white rounded-md shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        {editId ? 'Edit Candidate' : 'Add Candidate'}
      </h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="Full Name" name="name" type="text" placeholder="Enter full name" value={formData.name} onChange={handleChange} />
        <FormInput label="Email" name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
        <FormInput label="Phone Number" name="phoneNumber" type="text" placeholder="Enter phone number" value={formData.phoneNumber} onChange={handleChange} />
        <FormInput label="Skills" name="skills" type="text" placeholder="Enter skills" value={formData.skills} onChange={handleChange} />

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">Experience</label>
          <textarea
            name="experience"
            className="w-full border border-gray-300 rounded-md p-3 text-black"
            placeholder="Describe experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">Desired Role</label>
          <select
            name="desiredRole"
            value={formData.desiredRole}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-black"
          >
            <option value="">Select role</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Fullstack Developer</option>
          </select>
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          {editId ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
}