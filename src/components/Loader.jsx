import React from 'react';
import './Loader.css';

const Loader = ({ fullScreen }) => (
  <div className={`loader ${fullScreen ? 'loader-fullscreen' : ''}`}>
    <div className="loader-spinner"></div>
    <p>Loading...</p>
  </div>
);

export default Loader;