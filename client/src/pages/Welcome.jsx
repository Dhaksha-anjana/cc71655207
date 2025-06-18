export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <img
        src="alesia-kazantceva-VWcPlbHglYc-unsplash.jpg"
        alt="Office"
        className="w-[600px] rounded-lg shadow mb-6"
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to TalentTrack</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        Manage your candidates easily by adding, editing, and viewing them — all from one place.
      </p>

      <div className="flex gap-4">
        <a
          href="/candidates"
          className="bg-white-700 text-white px-6 py-3 rounded-md hover:bg-white-200"
        >
          View Candidates
        </a>
        <a
          href="/add"
          className="bg-white-600 text-white px-6 py-3 rounded-md hover:bg-white-600 "
        >
          Add Candidate
        </a>
      </div>
    </div>
  );
}
