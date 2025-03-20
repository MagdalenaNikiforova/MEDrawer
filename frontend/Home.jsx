import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Hello, we hope you're okay</h1>

      <div className="button-group">
        <button className="btn">Daily</button>
        <button className="btn">Weekly</button>
      </div>

      <button className="btn storage-btn">Storage</button>

      {/* When clicking "+", go to AddMedicine page */}
      <button className="floating-btn" onClick={() => navigate("/add-medicine")}>
        +
      </button>
    </div>
  );
}

export default Home;
