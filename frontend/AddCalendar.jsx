import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCalendar() {
  const [medicineName, setMedicineName] = useState("");
  const [selectedDrawer, setSelectedDrawer] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedDay, setDay] = useState("");
  const [whatTime, setHour] = useState("");

  const navigate = useNavigate();

  const drawerOptions = [
    { value: 1, label: "Drawer1" },
    { value: 2, label: "Drawer2" },
    { value: 3, label: "Drawer3" },
    { value: 4, label: "Drawer4" },
  ];

  const howOftenOptions = [
    { value: 1, label: "Daily" },
    { value: 2, label: "Weekly" },
    { value: 3, label: "Monthly" },
  ];

  const DayOptions = [
    { value: 1, label: "Monday"},
    { value: 2, label: "Tuesday"},
    { value: 3, label: "Wednesday"},
    { value: 4, label: "Thursday"},
    { value: 5, label: "Friday"},
    { value: 6, label: "Saturday"},
    { value: 7, label: "Sunday"},
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timeMedicine = {
      medicineName,
      drawerID: selectedDrawer,  
      frequencyID: selectedFrequency,  
      day: Number(selectedDay),
      whatTime,
    };

    try {
      const response = await fetch('http://localhost:5000/api/add-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timeMedicine),
      });

      if (response.ok) {
        const result = await response.json();
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
          <form onSubmit={handleSubmit}>  
            <h3 className='my-5'>Schedule Details</h3>

            {/* Medicine Name Input */}
            <input 
              type="text" 
              placeholder="Name of the medicine" 
              value={medicineName} 
              onChange={(e) => setMedicineName(e.target.value)} 
              className='form-control form-control-lg' 
              name="medicineName" 
            />

            {/* Drawer Selection */}
            <select 
              value={selectedDrawer} 
              onChange={(e) => setSelectedDrawer(e.target.value)} 
              className='form-select form-control-lg'
            >
              <option value="">Select drawer</option>
              {drawerOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Frequency Selection */}
            <select 
              value={selectedFrequency} 
              onChange={(e) => setSelectedFrequency(e.target.value)} 
              className='form-select form-control-lg'
            >
              <option value="">Select frequency</option>
              {howOftenOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Day Input */}
            <input 
              type="text" 
              placeholder="Day" 
              value={selectedDay} 
              onChange={(e) => setDay(e.target.value)} 
              className='form-control form-control-lg' 
              name="selectedDay"
            />

            {/* Time Input */}
            <input 
              type="time" 
              value={whatTime} 
              onChange={(e) => setHour(e.target.value)} 
              className='form-control form-control-lg' 
              name="whatTime"
            />

            {/* Buttons */}
            <div className='row'>
              <div className='col my-3 d-flex justify-content-center'>
                <button type="button" onClick={() => navigate("/")} className='btn btn-light mr-4'>Go Back</button> 
                <button type="submit" className='btn btn-primary'>Add Schedule</button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCalendar;
