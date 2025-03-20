import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./Home";
import AddMedicine from "./AddMedicine";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-medicine" element={<AddMedicine />} />
      </Routes>
    </Router>
  );
}

export default App;
