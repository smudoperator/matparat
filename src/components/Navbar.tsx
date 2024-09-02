// src/components/Navbar.tsx

import { Link } from 'react-router-dom';
import './Navbar.css';
import text from '../assets/MatPirat-text.png';
import logo from '../assets/MatPirat-logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dinners">Dinners</Link></li>
          <li><Link to="/addDinner">Add Dinner</Link></li>
          <li><Link to="/createDinnerPlan">Plan your dinner</Link></li>
        </ul>
        <img src={text} className="navbar-logo-text"></img>
        <img src={logo} className="navbar-logo"></img>
      </div>
    </nav>
  );
};

export default Navbar;