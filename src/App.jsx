import { Routes, Route, Link } from "react-router-dom";
import Hello from "./Hello";
import Daily from "./Daily";
import Weekly from "./Weekly";
import AddMedicine from "./AddMedicine";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Hello, we hope you are doing okay! 🙂
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />

      {/* Buttons */}
      <div className="flex gap-4 mb-4">
        <Link to="/daily">
          <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
            Daily
          </button>
        </Link>
        <Link to="/weekly">
          <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">
            Weekly
          </button>
        </Link>
      </div>

      {/* Floating Plus Button */}
      <Link to="/add">
        <button className="w-12 h-12 bg-purple-500 text-white text-2xl rounded-full shadow-md hover:bg-purple-600 flex items-center justify-center">
          +
        </button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/weekly" element={<Weekly />} />
        <Route path="/add" element={<AddMedicine />} />
      </Routes>
    </div>
  );
}

export default App;
