import React, { useEffect, useState } from 'react';
import './ViewerDashboard.css';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

const ViewerDashboard = () => {
  const [circulars, setCirculars] = useState([]);
  const [filteredCirculars, setFilteredCirculars] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const navigate = useNavigate();

  const departments = ['All', 'Finance', 'Legal', 'PPD', 'Management and Service', 'Vigilance', 'Marketing'];

  useEffect(() => {
    const fetchCirculars = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/circulars/getCirculars');
        const data = await res.json();
        setCirculars(data);
        setFilteredCirculars(data);
      } catch (error) {
        console.error('Error fetching circulars:', error);
      }
    };

    fetchCirculars();
  }, []);

  const handleFilterClick = (dept) => {
    setSelectedDept(dept);
    if (dept === 'All') {
      setFilteredCirculars(circulars);
    } else {
      setFilteredCirculars(circulars.filter(circ => circ.department === dept));
    }
  };

  const handleDeptLogin = () => {
    navigate('/login');
  };

  return (
    <div className="viewer-dashboard">
      <div className="top-bar">
        <img src={logo} alt="Logo" className="dashboard-logo" />
        <h1>Viewer Dashboard</h1>
        <button className="admin-login-button" onClick={handleDeptLogin}>
          Login
        </button>
      </div>
      <br></br>
      <br></br>

      <div className="filter-buttons">
        {departments.map((dept) => (
          <button
            key={dept}
            className={`filter-button ${selectedDept === dept ? 'active' : ''}`}
            onClick={() => handleFilterClick(dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="circular-grid">
        {filteredCirculars.map((circ, index) => (
          <div className="circular-card" key={index}>
            <h3>{circ.title}</h3>
      <p><strong>Date:</strong> {new Date(circ.uploaded_at).toLocaleDateString()}</p>
            <p><strong>Department:</strong> {circ.department}</p>
            <p><strong>Description:</strong> {circ.description}</p>
           <a href={circ.pdfUrl}>View PDF</a>

          </div>
        ))}
        {filteredCirculars.length === 0 && <p>No circulars found for selected department.</p>}
      </div>
    </div>
  );
};

export default ViewerDashboard;
