import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import '../css/Login.css'

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login } = useContext(UserContext);

  console.log('Login component rendered');

  const handleSubmit = (e) => {
    console.log('Form submit triggered');
    e.preventDefault();
    if (email && name) {
      console.log('Attempting to log in with:', { email, name });
      try {
        login(email, name);
        console.log('Login function called successfully');
        onClose(); // Close the login modal after successful login
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      console.log('Email or name is missing');
      alert('Please enter both your email and name.');
    }
  };

  return (
    <div className="login-modal">
      <div className="login-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                console.log('Email changed:', e.target.value);
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                console.log('Name changed:', e.target.value);
                setName(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;