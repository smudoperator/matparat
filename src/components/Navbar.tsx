// src/components/Navbar.tsx

import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dinners">Dinners</Link></li>
        <li><Link to="/addDinner">Add Dinner</Link></li>
        <li><Link to="/createDinnerPlan">Plan your dinner</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;