import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Company() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const companyName = queryParams.get('name');
  const selectedJob = queryParams.get('selected');

  const companyImages = {
    Google: 'https://logo.clearbit.com/google.com',
    Amazon: 'https://logo.clearbit.com/amazon.com',
    Adobe: 'https://logo.clearbit.com/adobe.com'
  };

  const allJobs = [
    { title: "Frontend Developer", company: "Google", location: "Chennai", type: "Full-time", seatsFilled: 5, seatsTotal: 5 },
    { title: "Cloud Engineer", company: "Google", location: "Hyderabad", type: "Full-time", seatsFilled: 2, seatsTotal: 5 },
    { title: "Backend Developer", company: "Amazon", location: "Bangalore", type: "Full-time", seatsFilled: 3, seatsTotal: 5 },
    { title: "DevOps Engineer", company: "Amazon", location: "Delhi", type: "Full-time", seatsFilled: 1, seatsTotal: 5 },
    { title: "UI/UX Designer", company: "Adobe", location: "Remote", type: "Contract", seatsFilled: 4, seatsTotal: 5 }
  ];

  const jobsForCompany = allJobs.filter(job => job.company === companyName);

  const isSeatFull = (job) => job.seatsFilled >= job.seatsTotal;
  const isVacant = (job) => job.seatsFilled < job.seatsTotal;

  const vacantJobs = jobsForCompany.filter(job => isVacant(job));
  const selectedJobData = jobsForCompany.find(job => job.title === selectedJob);

  if (!companyName || !companyImages[companyName]) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-gray-100 text-gray-700 px-6">
        <p>Invalid company. Please choose from the <a href="/jobs" className="text-blue-600 underline">Jobs</a> page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-rose-100 via-indigo-100 to-blue-100 px-6 py-12">
      <div className="flex flex-col items-center mb-10 text-center">
        <img
          src={companyImages[companyName]}
          alt={companyName}
          onError={(e) => { e.target.src = "https://via.placeholder.com/100x100?text=No+Logo"; }}
          className="w-24 h-24 object-contain mb-4 rounded"
        />
        <h1 className="text-4xl font-bold text-gray-800">{companyName} Careers</h1>
        <p className="text-gray-600 mt-2">Explore available roles and seat status</p>
      </div>

      {selectedJobData && isSeatFull(selectedJobData) && (
        <div className="bg-white text-center text-red-600 font-semibold p-4 rounded mb-6 shadow">
          The job <strong>{selectedJob}</strong> is currently full. Check other available roles below 👇
        </div>
      )}

      {vacantJobs.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No vacant positions currently available at {companyName}.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vacantJobs.map((job, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h2>
              <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-600"><strong>Type:</strong> {job.type}</p>
              <p className="text-gray-800 mt-2">
                <strong>Seats:</strong> {job.seatsFilled} / {job.seatsTotal}
              </p>
              <p className="text-green-600 font-semibold mt-1">Vacancy Available</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
