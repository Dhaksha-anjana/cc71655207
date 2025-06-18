import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../components/FormInput';

export default function AddCandidate() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    role: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const editId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    if (editId) {
      const existing = JSON.parse(localStorage.getItem('candidates')) || [];
      const toEdit = existing.find((c) => c.id === parseInt(editId));
      if (toEdit) setFormData(toEdit);
    }
  }, [editId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('candidates')) || [];

    if (editId) {
      const updated = existing.map((c) =>
        c.id === parseInt(editId) ? { ...formData, id: parseInt(editId) } : c
      );
      localStorage.setItem('candidates', JSON.stringify(updated));
      alert('Candidate updated!');
    } else {
      const updated = [...existing, { ...formData, id: Date.now() }];
      localStorage.setItem('candidates', JSON.stringify(updated));
      alert('Candidate added!');
    }

    navigate('/candidates');
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white rounded-md shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        {editId ? 'Edit Candidate' : 'Add Candidate'}
      </h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="Full Name" name="name" type="text" placeholder="Enter full name" value={formData.name} onChange={handleChange} />
        <FormInput label="Email" name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
        <FormInput label="Phone Number" name="phone" type="text" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} />
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
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-black"
          >
            <option>Select role</option>
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