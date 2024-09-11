// src/components/Navbar.tsx

import { Link } from 'react-router-dom';
import './Navbar.css'; // General navbar styles
import textLogo from '../assets/MatPirat-text.png';
import logoImage from '../assets/MatPirat-logo.png';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
  return (
      <nav className="navbar">
          <div className="navbar-container">
              {/* Mobile hamburger icon (hidden on larger screens) */}
              <NavbarMobile />
              
              {/* Logo and text */}
              <div className="navbar-brand">
                  <img src={textLogo} className="brand-text" alt="text-logo" />
                  <img src={logoImage} className="brand-logo" alt="logo" />
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