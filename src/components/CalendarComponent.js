import React, { useState, useContext } from 'react';
import './css/CalendarComponent.css';
import { FaUserPlus } from 'react-icons/fa';
import EventModal from './EventModal'; // Import the EventModal component
import { UserContext } from './user/UserContext'; // Import UserContext to check if the user is logged in

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false); // State for managing the event modal
  const [selectedDate, setSelectedDate] = useState(null); // State for the selected date to add an event
  const { user } = useContext(UserContext); // Get the logged-in user from UserContext

  const generateLocationUrl = (place) => {
    const query = encodeURIComponent(place);
    return `https://www.google.com/maps?q=${query}`;
  };

  const [events, setEvents] = useState([
    {
      id: 1,
      date: new Date(2024, 8, 14),
      name: "Career Fair",
      place: "City Convention Center",
      time: "10:00 AM - 4:00 PM",
    },
    {
      id: 2,
      date: new Date(2024, 8, 15),
      name: "Tech Conference",
      place: "Tech Hub",
      time: "9:00 AM - 6:00 PM",
    },
    {
      id: 3,
      date: new Date(2024, 8, 15),
      name: "Tech sucasuca",
      place: "64224 Arroyo Dr",
      time: "9:00 AM - 6:00 PM",
    },
  ].map(event => ({
    ...event,
    locationUrl: generateLocationUrl(event.place)
  })));

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getEventsForDay = (day) => {
    return events.filter(event =>
      event.date.getDate() === day &&
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleDayClick = (day) => {
    if (user && day) { // Check if user is logged in and the day is valid
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(date);
      setSelectedEvents(getEventsForDay(day));
      setIsEventModalOpen(true); // Open the modal to add a new event
    }
  };

  const changeMonth = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1);
      return newDate;
    });
  };

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const applySelectedDate = () => {
    setCurrentDate(new Date(selectedYear, selectedMonth, 1));
    setIsPickerOpen(false);
  };

  const handleInviteClick = (event) => {
    alert(`Invite your group to ${event.name}`);
  };

  const handleSaveEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]); // Add the new event to the list
  };

  const handleCloseModal = () => {
    setIsEventModalOpen(false);
  };

  return (
    <div className="calendar">
      {isPickerOpen && (
        <div className="picker-modal">
          <div className="picker-content">
            <label>
              Year:
              <input 
                type="number" 
                value={selectedYear} 
                onChange={handleYearChange} 
                min="1900" 
                max="2100" 
              />
            </label>
            <label>
              Month:
              <select value={selectedMonth} onChange={handleMonthChange}>
                {Array.from({ length: 12 }).map((_, index) => (
                  <option key={index} value={index}>
                    {new Date(0, index).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={applySelectedDate}>Go</button>
          </div>
        </div>
      )}
      
      <div className="calendar-nav">
        <button onClick={() => changeMonth(-1)}>‹</button>
        <span onClick={togglePicker} className="current-month">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </span>
        <button onClick={() => changeMonth(1)}>›</button>
      </div>
      <div className="calendar-header">
        {daysOfWeek.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-body">
        {getDaysInMonth(currentDate).map((day, index) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          return (
            <div
              key={index}
              className={`day ${day === null ? 'empty' : ''} ${isToday(day) ? 'today' : ''} ${dayEvents.length > 0 ? 'event' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <span className="day-number">{day}</span>
              {dayEvents.length > 0 && <span className="event-indicator">{dayEvents.length}</span>}
            </div>
          );
        })}
      </div>

      {selectedEvents.length > 0 && (
        <div className="event-details">
          <h3>Events on {selectedEvents[0].date.toDateString()}</h3>
          {selectedEvents.map(event => (
            <div key={event.id} className="event">
              <h4>{event.name}</h4>
              <p>
                Place:{" "}
                <a href={event.locationUrl} target="_blank" rel="noopener noreferrer">
                  {event.place}
                </a>
              </p>
              <p>Time: {event.time}</p>
              <button onClick={() => handleInviteClick(event)}>
                <FaUserPlus /> Invite Group
              </button>
            </div>
          ))}
        </div>
      )}

      {isEventModalOpen && (
        <EventModal
          selectedDate={selectedDate}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
