import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

const DeptDashboard = () => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const userDept = user?.department || '';

    const [formData, setFormData] = useState({
        department: userDept,
        title: '',
        //date: '',
        description: '',
        pdf: null,
    });

    useEffect(() => {
        if (!user || !user.department) {
            alert('Unauthorized access');
            navigate('/login');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, pdf: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('department', formData.department);
        data.append('title', formData.title);
        data.append('description', formData.description);
       // data.append('date', formData.date);
        data.append('pdf', formData.pdf); // MUST match backend multer field name

        try {
            const response = await fetch('http://localhost:5000/api/circulars/upload', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                console.log('✅ Upload successful:', result.message);
                setFormData({
                    department: userDept,
                    title: '',
                   // date: '',
                    description: '',
                    pdf: null,
                });
                fileInputRef.current.value = '';
            } else {
                alert(result.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Something went wrong while uploading');
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
                        <li onClick={() => navigate('/view-circulars')}>View Circular</li>
                        <li onClick={() => navigate('/dept-dashboard')}>Upload Circular</li>
                    </ul>
                </aside>

                <main className="main-content">
                    <h2 className="form-heading">Upload Circular</h2>

                    <form onSubmit={handleSubmit} className="upload-form">
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            disabled
                        />

                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <textarea

                            style={{
                                resize: 'none',
                                width: '',
                                height: '100px'
                            }}
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        {/* <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]} // prevent past dates
                        /> */}

                        <input
                            type="file"
                            accept="application/pdf"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            required
                        />

                        <button type="submit" className="upload-btn">Upload</button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default DeptDashboard;
