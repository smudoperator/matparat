// src/components/NavbarMobile.tsx

import { Link } from 'react-router-dom';
import './NavbarMobile.css'; // Separate CSS for mobile
import { useEffect, useRef, useState } from 'react';
import neonHamburger from '../assets/neon-hamburger.png';

const NavbarMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current && 
            !menuRef.current.contains(event.target as Node) &&
            buttonRef.current && 
            !buttonRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="mobile-menu-icon" onClick={toggleMenu} ref={buttonRef}>
                <img src={neonHamburger} alt="Menu" className="hamburger-icon" />
            </div>
            <div className={`mobile-menu ${isOpen ? "open" : ""}`} ref={menuRef}>
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