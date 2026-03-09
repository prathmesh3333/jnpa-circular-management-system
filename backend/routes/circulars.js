import React, { useEffect, useState } from 'react';
import './ViewCirculars.css'; // reuse existing ViewCirculars styles
import logo from './logo.png';
import axios from 'axios';

const AdminViewCirculars = () => {
    const [circulars, setCirculars] = useState([]);

    const user = JSON.parse(localStorage.getItem('user')) || {
        role: 'Admin',
        department: 'Admin'
    };

    useEffect(() => {
        const fetchCirculars = async () => {
            try {
                let endpoint = 'http://localhost:5000/api/circulars/getCirculars';
                if (user.department && user.department !== 'Admin') {
                    endpoint += `?department=${user.department}`;
                }

                const res = await axios.get(endpoint);
                const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setCirculars(sorted);
            } catch (error) {
                console.error('Failed to fetch circulars:', error);
            }
        };

        fetchCirculars();
    }, []);

    const handleViewPDF = (pdfUrl) => {
        if (pdfUrl) {
            window.location.href = pdfUrl; // open in same tab
        } else {
            alert("PDF not found.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this circular?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/circulars/delete/${id}`);
            setCirculars(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete circular.');
        }
    };

    return (
        <div className="view-circulars-container">
            <div className="topbar">
                <div className="logo-left">
                    <img src={logo} alt="Logo" className="dashboard-logo" />
                </div>
                <h1 className="topbar-heading">All Circulars</h1>
            </div>

            <div className="card-list">
                {circulars.length === 0 ? (
                    <p style={{ padding: '2rem' }}>No circulars found.</p>
                ) : (
                    circulars.map((circular) => (
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
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminViewCirculars;
