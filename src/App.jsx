import { Routes, Route, Link } from "react-router-dom";
import Hello from "./Hello";
import Daily from "./Daily";
import Weekly from "./Weekly";
import AddMedicine from "./AddMedicine";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pastelPink p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Hello, we hope you are doing okay! 🙂
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="w-72 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pastelPurple bg-pastelWhite mb-6 shadow-md"
      />

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <Link to="/daily">
          <button className="px-6 py-3 bg-pastelPurple text-gray-900 font-semibold rounded-full shadow-lg hover:bg-pastelPinkDark transition">
            Daily
          </button>
        </Link>
        <Link to="/weekly">
          <button className="px-6 py-3 bg-pastelPurple text-gray-900 font-semibold rounded-full shadow-lg hover:bg-pastelPinkDark transition">
            Weekly
          </button>
        </Link>
      </div>

      {/* Floating Plus Button */}
      <Link to="/add">
        <button className="w-14 h-14 bg-pastelPinkDark text-white text-2xl rounded-full shadow-lg hover:bg-pastelPurple transition flex items-center justify-center">
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
