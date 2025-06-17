export default function Jobs() {
  const jobList = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Chennai, India",
      type: "Full-time",
      description: "Build and maintain user interfaces using React, Tailwind, and modern web tools."
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Amazon",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Develop APIs, manage databases, and handle backend services using Node.js and Express."
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Adobe",
      location: "Remote",
      type: "Contract",
      description: "Design intuitive user experiences and interfaces using Figma and Adobe XD."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Job Openings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobList.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h2>
            <p className="text-gray-700 mb-1"><strong>Company:</strong> {job.company}</p>
            <p className="text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
            <p className="text-gray-600 mb-1"><strong>Type:</strong> {job.type}</p>
            <p className="text-gray-600 mt-2 text-sm">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
