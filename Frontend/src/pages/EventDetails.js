import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

import './EventDetails.css';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data);
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      await api.post(`/registrations/${id}/register`);
      setMessage('Registered successfully!');
      setEvent({ ...event, registeredUsers: [...event.registeredUsers, user.id] });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  if (!event) return <div>Loading...</div>;

  const isRegistered = user && event.registeredUsers.includes(user.id);

  return (
    <div className="event-details-container">
      <h2 className="event-details-title">{event.title}</h2>
      <div className="event-details-content">
        <p>{event.description}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Date:</strong> {event.date} <strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        {event.registration_link && (
          <p>
            <strong>Link:</strong>{' '}
            <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
              {event.registration_link}
            </a>
          </p>
        )}
        {user ? (
          isRegistered ? (
            <p className="text-success">You are registered!</p>
          ) : (
            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
          )
        ) : (
          <p>Please <a href="/login">login</a> to register.</p>
        )}
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
  
}

export default EventDetails;