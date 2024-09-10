// src/components/NavbarMobile.tsx

import { Link } from 'react-router-dom';
import './Navbar.css';
import text from '../assets/MatPirat-text.png';
import logo from '../assets/MatPirat-logo.png';
import { useState } from 'react';

const NavbarMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <>
        <div className="navbar-mobile-container" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
        </div>
        {isOpen && (
          <div className="navbar-mobile-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dinners">Dinners</Link></li>
              <li><Link to="/addDinner">Add Dinner</Link></li>
              <li><Link to="/createDinnerPlan">Plan your dinner</Link></li>
            </ul>
          </div>
        )}
      </>
    );
  };

export default NavbarMobile;