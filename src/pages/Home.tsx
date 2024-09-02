// src/pages/Home.tsx

import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="home-content">
        <h1>Sett seil mot en hverdag uten bekymring</h1>
        <p className="home-subtitle">
          La MatPirat planlegge morgendagens fangst og nyt en smakfull reise gjennom ukens måltider.
        </p>
        <button className="cta-button">Start planlegging</button>
      </div>
    </div>
  );
};

export default Home;