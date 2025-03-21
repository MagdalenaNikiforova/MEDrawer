import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./Home";
import AddMedicine from "./AddMedicine";
import Daily from "./Daily";
import Weekly from "./Weekly";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-medicine" element={<AddMedicine />}/>
        <Route path="/daily" element={<Daily />}/>
        <Route path="/weekly" element={<Weekly />}/>
      </Routes>
    </Router>
  );
}

export default App;



