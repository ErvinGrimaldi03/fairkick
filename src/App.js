import logo from './logo.svg';
import CalendarComponent from './components/CalendarComponent';
import './App.css';
import Navbar from './components/NavBar';


function App() {
  return (
    <div className="App">
      <Navbar />
      <CalendarComponent />
    </div>
  );
}

export default App;
