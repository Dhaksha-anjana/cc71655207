import { useEffect, useState } from 'react';
import axios from 'axios';

const defaultCompanies = [
  {
    name: 'Google',
    logo: 'https://logo.clearbit.com/google.com',
  },
  {
    name: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
  },
  {
    name: 'Adobe',
    logo: 'https://logo.clearbit.com/adobe.com',
  }
];

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error('Error fetching jobs:', err));
  }, []);

  const renderJobs = (company) => {
    const companyJobs = jobs.filter(job => job.company.toLowerCase() === company.name.toLowerCase());

    return (
      <div key={company.name} className="mb-10">
        <div className="flex items-center mb-3">
          <img src={company.logo} alt={company.name} className="w-8 h-8 mr-2" />
          <h2 className="text-xl font-semibold">{company.name}</h2>
        </div>
        {companyJobs.length === 0 ? (
          <p className="text-sm text-gray-600 ml-10">Jobs added for {company.name}.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyJobs.map(job => (
              <div key={job._id} className="bg-white rounded shadow p-4">
                <h3 className="font-bold">{job.title}</h3>
                <p><strong>Department:</strong> {job.department}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p className="mt-1 text-gray-600 text-sm">{job.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderOtherCompanies = () => {
    const known = defaultCompanies.map(c => c.name.toLowerCase());
    const grouped = jobs.reduce((acc, job) => {
      if (!known.includes(job.company.toLowerCase())) {
        if (!acc[job.company]) acc[job.company] = [];
        acc[job.company].push(job);
      }
      return acc;
    }, {});

    return Object.keys(grouped).map(company => (
      <div key={company} className="mb-10">
        <h2 className="text-xl font-semibold mb-2 text-black">{company}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
          {grouped[company].map(job => (
            <div key={job._id} className="bg-white rounded shadow p-4">
              <h3 className="font-bold">{job.title}</h3>
              <p><strong>Department:</strong> {job.department}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p className="mt-1 text-gray-600 text-sm">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-black">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Jobs by Company</h1>
      {defaultCompanies.map(renderJobs)}
      {renderOtherCompanies()}
    </div>
  );
}
