import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from "./Home";
import AddMedicine from "./AddMedicine";
import AddCalendar from './AddCalendar';
import Daily from "./Daily";
import Weekly from "./Weekly";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-medicine" element={<AddMedicine />}/>
        <Route path="/add-calendar" element={<AddCalendar />}/>
        <Route path="/daily" element={<Daily />}/>
        <Route path="/weekly" element={<Weekly />}/>
      </Routes>
    </Router>
  );
}

export default App;



