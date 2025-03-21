import React, { useState } from 'react';

function App() {
  const [text, setText] = useState("");
  const esp32Ip = "http://192.168.0.31";  // Replace with your ESP32 IP address

  // Function to handle text display
  const handleButtonClick = () => {
    // Send the text to the ESP32 via a POST request
    fetch(`${esp32Ip}/displayText`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: text
    })
    .then(response => response.text())
    .then(data => {
      console.log("Response from ESP32:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  // Function to handle LED control
  const handleLEDButtonClick = (ledNum) => {
    // Send the LED number to the ESP32 to turn on the corresponding LED
    fetch(`${esp32Ip}/controlLED`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(ledNum) // Send LED number (1-4)
    })
    .then(response => response.text())
    .then(data => {
      console.log("Response from ESP32:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text for display"
        />
        <button onClick={handleButtonClick}>
          Send Text to Display
        </button>
      </div>
      
      <div>
        <button onClick={() => handleLEDButtonClick(1)}>
          LED 1
        </button>
        <button onClick={() => handleLEDButtonClick(2)}>
          LED 2
        </button>
        <button onClick={() => handleLEDButtonClick(3)}>
          LED 3
        </button>
        <button onClick={() => handleLEDButtonClick(4)}>
          LED 4
        </button>
      </div>
    </div>
  );
}

export default App;
