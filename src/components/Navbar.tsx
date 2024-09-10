// src/components/Navbar.tsx

import { Link } from 'react-router-dom';
import './Navbar.css';
import text from '../assets/MatPirat-text.png';
import logo from '../assets/MatPirat-logo.png';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Hamburger menu for mobile */}
        <div className="navbar-mobile">
          <NavbarMobile />
        </div>
        {/* Logo and text */}
        <div className="navbar-images">
          <img src={text} className="navbar-logo-text" alt="text-logo" />
          <img src={logo} className="navbar-logo" alt="logo" />
        </div>
        {/* Regular links (hidden on mobile) */}
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dinners">Dinners</Link></li>
          <li><Link to="/addDinner">Add Dinner</Link></li>
          <li><Link to="/createDinnerPlan">Plan your dinner</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;