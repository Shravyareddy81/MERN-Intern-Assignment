import React, { useState, useEffect } from 'react';
import API from '../api/api';

const StudentDashboard = () => {
  const [profile, setProfile] = useState({ name: '', email: '', course: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/student/profile');
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('/student/profile', profile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Dashboard</h2>
      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Course:</strong> {profile.course}</p>
          <button onClick={() => setIsEditing(true)}>Update Profile</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Course:</label>
            <input type="text" name="course" value={profile.course} onChange={handleChange} required />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default StudentDashboard;