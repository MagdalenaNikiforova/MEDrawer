import { Link } from "react-router-dom";

function Weekly() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Weekly</h1>
      <Link to="/">
        <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600">
          Back
        </button>
      </Link>
    </div>
  );
}

export default Weekly;
