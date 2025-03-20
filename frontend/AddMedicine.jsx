import { useNavigate } from 'react-router-dom';

function AddMedicine() {
  const navigate = useNavigate();

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Congrats, you're in!</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  );
}

export default AddMedicine;
