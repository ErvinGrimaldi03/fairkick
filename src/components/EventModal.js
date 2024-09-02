import React, { useState } from 'react';
// import '../components/css/EventModal.css'; // Add styling for your modal here

const EventModal = ({ selectedDate, onSave, onClose }) => {
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventPlace, setEventPlace] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(), // Use a unique ID
      date: selectedDate,
      name: eventName,
      place: eventPlace,
      time: eventTime,
    };
    onSave(newEvent);
    onClose();
  };

  return (
    <div className="event-modal">
      <div className="event-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Add Event on {selectedDate.toDateString()}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Event Time:</label>
            <input
              type="text"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Event Place:</label>
            <input
              type="text"
              value={eventPlace}
              onChange={(e) => setEventPlace(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
