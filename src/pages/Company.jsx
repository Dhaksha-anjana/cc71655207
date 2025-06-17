export default function Company() {
  const jobList = [
    { company: "Google" },
    { company: "Amazon" },
    { company: "Adobe" }
  ];

  const uniqueCompanies = [...new Set(jobList.map(job => job.company))];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Hiring Companies</h1>
      <ul className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 text-black list-disc list-inside">
        {uniqueCompanies.map((company, index) => (
          <li key={index} className="mb-2">{company}</li>
        ))}
      </ul>
    </div>
  );
}
