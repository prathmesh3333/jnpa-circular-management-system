import React, { useEffect, useState } from 'react';
import './ViewCirculars.css';
import logo from './logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewCirculars1 = () => {
    const [circulars, setCirculars] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user')) || {
        department: 'Finance',
    };

    useEffect(() => {
        const fetchCirculars = async () => {
            try {
                let endpoint = 'http://localhost:5000/api/circulars/getCirculars';
                if (user.department && user.department !== 'Admin') {
                    endpoint += `?department=${user.department}`;
                }

                const res = await axios.get(endpoint);
                setCirculars(res.data);
            } catch (error) {
                console.error('Failed to fetch circulars:', error);
            }
        };

        fetchCirculars();
    }, []);

    const handleViewPDF = (url) => {
    if (url) {
      window.location.href = url; // ✅ open in same tab
    } else {
      alert("PDF not found.");
    }
  };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this circular?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/circulars/delete/${id}`);
            setCirculars(circulars.filter((c) => c.id !== id));
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete circular.');
        }
    };

    const onLogout = () => {
        localStorage.clear();
        navigate('/ViewerDashboard');
    };

    return (
        <div className="admin-dashboard">
            <div className="topbar">
                <div className="dashboard-title">
                    <img src={logo} alt="Logo" className="dashboard-logo" />
                </div>
                <h1 className="topbar-heading">JNPA Circulars</h1>
                <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>

            <div className="dashboard-body">
                <aside className="sidebar">
                    <h2 className="sidebar-title">Panel</h2>
                    <ul>
                        <li onClick={() => navigate('/view-circulars1')}>View Circular</li>
                        <li onClick={() => navigate('/ms-dashboard')}>Upload Circular</li>
                    </ul>
                </aside>

                <main className="main-content">
                    <h2 className="form-heading">All Circulars</h2>
                    {circulars.length === 0 ? (
                        <p style={{ padding: '2rem' }}>No circulars found.</p>
                    ) : (
                        <div className="card-list">
                            {circulars.map((circular) => (
                                <div className="full-width-card" key={circular.id}>
                                    <div className="card-left">
                                        <h3>{circular.department}</h3>
                                        <p><strong>Title:</strong> {circular.title}</p>
                                        <p><strong>Uploaded At:</strong> {new Date(circular.uploaded_at).toLocaleDateString()}</p>
                                        <p><strong>Description:</strong> {circular.description}</p>
                                    </div>
                                    <div className="card-right">
                                        <button className="view-btn" onClick={() => handleViewPDF(circular.pdfUrl)}>View PDF</button>
                                        <button className="delete-btn" onClick={() => handleDelete(circular.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ViewCirculars1;
