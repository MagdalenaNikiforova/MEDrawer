import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddMedicine() {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  /*const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically handle sending the data to the backend.
    console.log("Medicine Added:", { medicineName, dosage, description });

    // For now, just show the success popup
    alert("Medicine added successfully!");
  };*/


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing on form submit
  
    // Prepare the data to send
    const medicineData = {
      medicineName,
      dosage,
      description
    };
  
    try {
      // Send data to backend via POST request
      const response = await fetch('http://localhost:5000/api/add-medicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server we're sending JSON data
        },
        body: JSON.stringify(medicineData), // Convert JS object to JSON string
      });
  
      // Check if response is successful
      if (response.ok) {
        const result = await response.json(); // Parse the JSON response from the server
        console.log('Medicine Added:', result);
        alert('Medicine added successfully!');
      } else {
        throw new Error('Failed to add medicine');
      }
    } catch (error) {
      console.error('Error adding medicine:', error);
      alert('An error occurred while adding the medicine.');
    }
  };


  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Congrats, you're in!</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Medicine Name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Dosage (e.g., 2 times a day)"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Add Medicine</button>
        </form>
        
        <button onClick={() => navigate("/")} style={styles.goBackButton}>Go Back</button>
      </div>
    </div>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  input: {
    width: '80%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  textarea: {
    width: '80%',
    height: '80px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  goBackButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AddMedicine;
