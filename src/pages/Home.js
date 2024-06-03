import React from 'react';
import image from '../assets/file (4).png';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="text-container">
        <h1>Admin Interface</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        <button className="try-it-now-button">Welcome</button>
      </div>
      <div className="image-container">
        <img src={image} alt="Example" />
      </div>
    </div>
  );
}

export default Home;
