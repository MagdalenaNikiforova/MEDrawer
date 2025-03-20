import React from "react";

function HomePage() {
  return (
    <div className="container">
      <h1 className="title">Hello, we hope you're okay</h1>

      <div className="button-group">
        <button className="btn">Daily</button>
        <button className="btn">Weekly</button>
      </div>

      <button className="btn storage-btn">Storage</button>

      <button className="floating-btn">+</button>
    </div>
  );
}

export default HomePage;
