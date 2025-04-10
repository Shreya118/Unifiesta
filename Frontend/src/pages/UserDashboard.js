import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './UserDashboard.css';

function UserDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const regResponse = await api.get('/registrations/my-registrations');
      setRegistrations(regResponse.data);
      const userResponse = await api.get('/users/profile');
      setName(userResponse.data.name);
    };
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.put('/users/profile', { name });
    alert('Profile updated');
    setIsEditing(false);
  };

  return (
    <div className="user-dashboard-container">
      <h2 className="user-dashboard-title">User Dashboard</h2>

      <div className="profile-section">
        <h3>Profile</h3>
        {!isEditing ? (
          <div className="mb-3">
            <div className="profile-name">{name}</div>
            <button
              className="btn btn-sm btn-outline-primary edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="mb-4">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Name</button>
          </form>
        )}
      </div>

      <div className="events-section">
        <h3>Registered Events</h3>
        {registrations.map(reg => (
          <div key={reg.id} className="card mb-3">
            <div className="card-body">
              <h5>{reg.Event.title}</h5>
              <p>{reg.Event.date} at {reg.Event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
