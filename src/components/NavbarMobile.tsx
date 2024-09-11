// src/components/NavbarMobile.tsx

import { Link } from 'react-router-dom';
import './NavbarMobile.css'; // Separate CSS for mobile
import { useState } from 'react';
import neonHamburger from '../assets/neon-hamburger.png';

const NavbarMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="mobile-menu-icon" onClick={toggleMenu}>
                <img src={neonHamburger} alt="Menu" className="hamburger-icon" />
            </div>
            <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
                <ul>
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link to="/dinners" onClick={toggleMenu}>Dinners</Link></li>
                    <li><Link to="/addDinner" onClick={toggleMenu}>Add Dinner</Link></li>
                    <li><Link to="/createDinnerPlan" onClick={toggleMenu}>Plan Dinners</Link></li>
                </ul>
            </div>
        </>
    );
};

export default NavbarMobile;