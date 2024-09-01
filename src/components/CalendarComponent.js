import React, { useState, useEffect } from 'react';
import './css/CalendarComponent.css';
import { FaUserPlus } from 'react-icons/fa';

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedEvents, setSelectedEvents] = useState([]);
  
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
      locationUrl: generateLocationUrl("City Convention Center"),
    },
    {
      id: 2,
      date: new Date(2024, 8, 15),
      name: "Tech Conference",
      place: "Tech Hub",
      time: "9:00 AM - 6:00 PM",
      locationUrl: generateLocationUrl("Tech Hub"),
    },
    {
      id: 3,
      date: new Date(2024, 8, 15),
      name: "Tech sucasuca",
      place: "64224 Arroyo Dr",
      time: "9:00 AM - 6:00 PM",
      locationUrl: generateLocationUrl("64224 Arroyo Dr"),
    },
  ]);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    setSelectedEvents([]);
  }, [currentDate]);

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
    const dayEvents = getEventsForDay(day);
    setSelectedEvents(dayEvents);
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
    // Placeholder for the actual invite functionality
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
              onClick={() => day && handleDayClick(day)}
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
    </div>
  );
};

export default CalendarComponent;