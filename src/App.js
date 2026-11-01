
import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    rollNo: '',
    name: '',
    email: '',
    branch: '',
    mobile: ''
  });

  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.rollNo.trim() ||
      !form.name.trim() ||
      !form.email.trim() ||
      !form.branch ||
      !form.mobile.trim()
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      setError('Mobile number must contain exactly 10 digits.');
      return;
    }

    if (students.some((student) => student.rollNo === form.rollNo.trim())) {
      setError('Roll number already exists.');
      return;
    }

    setStudents([
      ...students,
      { ...form, rollNo: form.rollNo.trim() }
    ]);

    setForm({
      rollNo: '',
      name: '',
      email: '',
      branch: '',
      mobile: ''
    });

    setError('');
  };

  return (
    <div className="container">
      <h1>Student Registration Form</h1>

      <form onSubmit={handleSubmit}>
        <label>Roll Number</label>
        <input name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="Enter roll number" />

        <label>Student Name</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Enter student name" />

        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email" />

        <label>Branch</label>
        <select name="branch" value={form.branch} onChange={handleChange}>
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="CSE (Data Science)">CSE (Data Science)</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
        </select>

        <label>Mobile Number</label>
        <input name="mobile" type="tel" value={form.mobile} onChange={handleChange} placeholder="Enter 10-digit mobile number" />

        {error && <p className="error">{error}</p>}

        <button type="submit">Register Student</button>
      </form>

      <h2>Registered Students</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Mobile</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.rollNo}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.branch}</td>
                <td>{student.mobile}</td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td colSpan="5">No students registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
