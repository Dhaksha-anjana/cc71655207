import { useState, useEffect } from 'react';

export default function Reports() {
  const [jobs, setJobs] = useState([
    { title: "Frontend Developer", company: "Google", seatsFilled: 5, seatsTotal: 5 },
    { title: "Cloud Engineer", company: "Google", seatsFilled: 2, seatsTotal: 5 },
    { title: "Backend Developer", company: "Amazon", seatsFilled: 3, seatsTotal: 5 },
    { title: "DevOps Engineer", company: "Amazon", seatsFilled: 1, seatsTotal: 5 },
    { title: "UI/UX Designer", company: "Adobe", seatsFilled: 4, seatsTotal: 5 },
  ]);

  const [formState, setFormState] = useState({});
  const [booked, setBooked] = useState(() => {
    return JSON.parse(localStorage.getItem('bookings')) || {};
  });

  const handleInputChange = (jobTitle, field, value) => {
    setFormState(prev => ({
      ...prev,
      [jobTitle]: {
        ...prev[jobTitle],
        [field]: value
      }
    }));
  };

  const handleBook = (job) => {
    const { email, resume } = formState[job.title] || {};
    const isFull = job.seatsFilled >= job.seatsTotal;

    if (!email || !resume) {
      alert("Please enter your email and upload a resume.");
      return;
    }

    if (isFull) return;

    const updatedJobs = jobs.map(j =>
      j.title === job.title ? { ...j, seatsFilled: j.seatsFilled + 1 } : j
    );
    setJobs(updatedJobs);

    const newBooking = {
      title: job.title,
      company: job.company,
      email,
      resumeName: resume.name,
      status: "Interview details will be sent to your email"
    };

    const updatedBooked = { ...booked, [job.title]: newBooking };
    setBooked(updatedBooked);
    localStorage.setItem('bookings', JSON.stringify(updatedBooked));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-rose-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Job Vacancy Reports</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {jobs.map((job, index) => {
          const booking = booked[job.title];
          const isFull = job.seatsFilled >= job.seatsTotal;

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                <p className="text-gray-600">
                  <strong>Company:</strong> {job.company}
                </p>
                <p className="text-gray-700">
                  <strong>Seats:</strong> {job.seatsFilled} / {job.seatsTotal}
                </p>
              </div>

              {!booking && !isFull && (
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="p-2 w-full rounded border text-gray-800 placeholder-gray-500"
                    onChange={(e) => handleInputChange(job.title, 'email', e.target.value)}
                  />
                  <input
                    type="file"
                    accept=".pdf"
                    className="p-2 w-full border rounded text-gray-800 file:text-blue-600"
                    onChange={(e) => handleInputChange(job.title, 'resume', e.target.files[0])}
                  />
                  <button
                    onClick={() => handleBook(job)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Book Seat
                  </button>
                </div>
              )}

              {isFull && !booking && (
                <p className="text-red-600 font-semibold">Seat Full</p>
              )}

              {booking && (
                <div className="text-green-700 text-sm mt-2 bg-green-100 p-3 rounded text-black">
                  ✅ Seat booked!<br />
                  Email: {booking.email}<br />
                  Resume: {booking.resumeName}<br />
                  {booking.status}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
