import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"

function MedicinePage() {
  const navigate = useNavigate();
  const [medicineName, setMedicineName] = useState("");

  const handleSubmit = () => {
    alert(`Medicine "${medicineName}" added!`);
    navigate("/"); // Redirect back to Home
  };

  return (
    <div className="container">
      <h1>Add a Medicine</h1>
      
      <input
        type="text"
        placeholder="Enter medicine name"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
        className="input-field"
      />
      
      <button onClick={handleSubmit} className="btn">Save</button>
      <button onClick={() => navigate("/")} className="btn back-btn">Back</button>
    </div>
  );
}

export default MedicinePage;