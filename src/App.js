import React, { useState } from "react";
import CalendarComponent from "./components/CalendarComponent";
import Navbar from './components/NavBar';
import Login from './components/user/Login';
import { UserProvider } from "./components/user/UserContext";
import "./App.css"

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <UserProvider>
      <div className='App'>
        <Navbar onLoginClick={toggleLogin} />
        {isLoginOpen && <Login onClose={toggleLogin} />}
        <CalendarComponent />
      </div>
    </UserProvider>
  );
}

export default App;