import React, { useState } from 'react';

function App() {
  const [text, setText] = useState("");
  const esp32Ip = "http://192.168.114.97/displayText";  // Replace with your ESP32 IP address

  const handleButtonClick = () => {
    // Send the text to the ESP32 via a POST request
    fetch(esp32Ip, {
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

  return (
    <div className="App">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={handleButtonClick}>
        Send Text to Display
      </button>
    </div>
  );
}

export default App;
