import React, { useState, useEffect } from 'react';
import api from '../services/api';

import './AdminDashboard.css';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', category: '', date: '', time: '', location: '', registration_link: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get('/events');
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category, date, time, location } = form;
    if (!title || !description || !category || !date || !time || !location) {
      setError('All fields except Registration Link are required');
      return;
    }
    setError(''); 
    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post('/events', form);
      }
      setForm({ title: '', description: '', category: '', date: '', time: '', location: '', registration_link: '' });
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event');
    }
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await api.delete(`/events/${id}`);
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div class="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <h3>{editingId ? 'Edit Event' : 'Add Event'}</h3>
      {error && <div className="alert alert-danger">{error}</div>} {}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3"><input className="form-control" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
        <div className="mb-3"><textarea className="form-control" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea></div>
        <div className="mb-3"><input className="form-control" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
        <div className="mb-3"><input type="date" className="form-control" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
        <div className="mb-3"><input type="time" className="form-control" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
        <div className="mb-3"><input className="form-control" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
        <div className="mb-3"><input className="form-control" placeholder="Registration Link" value={form.registration_link} onChange={(e) => setForm({ ...form, registration_link: e.target.value })} /></div>
        <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Event</button>
      </form>
      <h3>All Events</h3>
      {events.map(event => (
        <div key={event.id} className="card mb-3">
          <div className="card-body">
            <h5>{event.title}</h5>
            <p>{event.date} at {event.time} - {event.registrationCount} registered</p>
            <button className="btn btn-secondary me-2" onClick={() => handleEdit(event)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(event.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;