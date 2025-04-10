import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';

import './Home.css';

function Home() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const params = {};
      if (category) params.category = category;
      if (date) params.date = date;
      if (location) params.location = location;
      const response = await api.get('/events', { params });
      setEvents(response.data);
    };
    fetchEvents();
  }, [category, date, location]);

  return (
    <div className="home-container">
      <h2 className="home-title"><b>Upcoming Events</b></h2>
      <div className="row mb-3">
        <div className="col">
          <input type="text" className="form-control" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="col">
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      </div>
      <div className="event-list">
        {events.map(event => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  );
}

export default Home;
