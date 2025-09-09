import React, { useState, useEffect } from 'react';
import API from '../api/api';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', course: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get('/admin/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/admin/students/${editingId}`, newStudent);
      } else {
        await API.post('/admin/students', newStudent);
      }
      setNewStudent({ name: '', email: '', course: '' });
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (student) => {
    setNewStudent({ name: student.name, email: student.email, course: student.course });
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <h3>{editingId ? 'Edit Student' : 'Add New Student'}</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" name="name" value={newStudent.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={newStudent.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="course" value={newStudent.course} onChange={handleChange} placeholder="Course" required />
        <button type="submit">{editingId ? 'Update Student' : 'Add Student'}</button>
      </form>
      <h3>All Students</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Course</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.email}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{student.course}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student._id)} style={{ marginLeft: '10px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;