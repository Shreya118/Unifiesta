import React from 'react';
import { Link } from 'react-router-dom';

import './EventCard.css';

function EventCard({ event }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">{event.description.substring(0, 100)}...</p>
        <p><strong>Date:</strong> {event.date} <strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Registrations:</strong> {event.registrationCount}</p>
        <Link to={`/events/${event.id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
}


export default EventCard;