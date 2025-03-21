import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";



function AddMedicine() {
  const [medicineName, setMedicineName] = useState("");
  const [drawer, setDrawer] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [schedule, setSchedule] = useState("");
  const [day, setDay] = useState("");

  const navigate = useNavigate();
  const drawerOptions = [
    {value:1, label: "Drawer1"},
    {value:2, label: "Drawer2"},
    {value:3, label: "Drawer3"},
    {value:4, label: "Drawer4"},
];


const symptomOptions = [
    {value:1, label: "Headache"},
    {value:2, label: "Stomachache"},
    {value:3, label: "Low Blood Sugar"},
    {value:4, label: "High Blood Sugar"},
    {value:5, label: "High Blood Pressure"},
]; 

const [selectedDrawer, setSelectedDrawer ] = useState();
const [selectedSymptom, setSelectedSymptom ] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing on form submit

    // Prepare the medicine data
    const medicineData = {
      medicineName,
      drawer,
      symptoms,
    };

    // Prepare the schedule data
    const timeMedicine = {
      medicineName,
      schedule,
      day,
    };

    try {
      // Send medicine data to backend via POST request
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

    try {
      // Send schedule data to backend via POST request
      const response = await fetch('http://localhost:5000/api/add-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server we're sending JSON data
        },
        body: JSON.stringify(timeMedicine), // Convert JS object to JSON string
      });

      // Check if response is successful
      if (response.ok) {
        const result = await response.json(); // Parse the JSON response from the server
        console.log('Schedule Added:', result);
        alert('Schedule set successfully!');
      } else {
        throw new Error('Failed to set schedule');
      }
    } catch (error) {
      console.error('Error setting schedule:', error);
      alert('An error occurred while setting the schedule.');
    }
  };

  
  return (
    <div className="container">
        <div className='row'>
            <div className='col mt-5'>
            <form action='http://localhost:5000/api/add-medicine' method='POST'>
          <h3 className='my-5'>Medicine Details</h3>
          <div className='row'>
          <div className='col mb-3'>
          <input
            type="text"
            placeholder="Name of the medicine"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className='form-control form-control-lg'
            name="medicineName"
          />
</div></div>
<div className='row'>
<div className='col mb-3'>
          <select
            value={selectedDrawer}
            onChange={(e) => setSelectedDrawer(e.target.value)} // Update state on change
            name='drawerID'
            className='form-select form-control-lg'
          >
            <option value="">Select drawer</option>
            {drawerOptions.map((option, index) => {
                return (<option key={`${option}-${index}`} value={option.value}>{option.label}</option>)
            })}
          </select>
          </div></div>
<div className='row'>
<div className='col mb-3'>
          <select
            value={selectedSymptom}
            onChange={(e) => setSelectedSymptom(e.target.value)} // Update state on change
            name='symptomID'
            className='form-select form-control-lg'
          >
            <option value="">What symptoms does it heal?</option>
            {symptomOptions.map((option, index) => {
                return (<option key={`${option}-${index}`} value={option.value}>{option.label}</option>)
            })}
          </select>
          </div></div>
<div className='row'>
<div className='col my-3 d-flex justify-content-center'>
          <button type="button" onClick={() => navigate("/")} className='btn btn-light mr-4'>Go Back</button> 
          <button type="submit" className='btn btn-primary'>Add Medicine</button>
          </div></div>
        </form>


            </div>

        </div>

    </div>
  );
}

export default AddMedicine;
