import React, { useState, useContext, useEffect } from 'react';
import './css/NavBar.css';
import { UserContext } from './user/UserContext';

function Navbar({ onLoginClick }) { // Pass onLoginClick as a prop. This is needed or everything breaks for some reason. I hate JS 
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    console.log('Navbar: User state changed', user);
  }, [user]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(`Menu is now ${!isOpen ? 'open' : 'closed'}`);
  };

  const handleLogout = () => {
    console.log('Navbar: Logout clicked');
    logout();
  };

  const handleLoginClick = (e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    if (onLoginClick) {
      onLoginClick(); // Call the provided onLoginClick function
    }
  };

  return (
    <nav className="NavBar">
      <h1>FairKick</h1>
      <ul className={`NavLink ${isOpen ? 'active' : ''}`}>
        <li><a href="#about">About</a></li>
        {user ? (
          <>
            <li><span>Welcome, {user.name || user.email}</span></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><a href="#login" onClick={handleLoginClick}>Login</a></li>
        )}
      </ul>
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
