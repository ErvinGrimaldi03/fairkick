import React, { useState } from 'react';
import './css/NavBar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(`Menu is now ${!isOpen ? 'open' : 'closed'}`);  // Debugging statement
  };

  return (
    <nav className="NavBar">
      <h1>FairKick</h1>
      <ul className={`NavLink ${isOpen ? 'active' : ''}`}>
        <li><a href="#about">About</a></li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;