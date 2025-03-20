import { Link } from "react-router-dom";
import { useState } from "react";

function AddMedicine() {
  const [medicine, setMedicine] = useState({
    name: "",
    symptom: "",
    drawer: "",
  });

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved Medicine:", medicine);
    alert("Medicine saved!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add a Medicine</h1>
      
      <input
        type="text"
        name="name"
        placeholder="Medicine Name"
        value={medicine.name}
        onChange={handleChange}
        className="w-64 p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="symptom"
        placeholder="Symptom"
        value={medicine.symptom}
        onChange={handleChange}
        className="w-64 p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="drawer"
        placeholder="Drawer Number"
        value={medicine.drawer}
        onChange={handleChange}
        className="w-64 p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleSave}
        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 mb-4"
      >
        Save
      </button>

      <Link to="/">
        <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600">
          Back
        </button>
      </Link>
    </div>
  );
}

export default AddMedicine;
