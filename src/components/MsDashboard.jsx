// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdminDashboard.css';
// import logo from './logo.png';

// const MsDashboard = () => {
//     const fileInputRef = useRef(null);
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         department: '',
//         title: '',
//        // date: '',
//         description: '',
//         pdf: null,
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setFormData(prev => ({ ...prev, pdf: e.target.files[0] }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         data.append('department', formData.department);
//         data.append('title', formData.title);
//         data.append('description', formData.description);
//        // data.append('date', formData.date);
//         data.append('pdf', formData.pdf);

//         try {
//             const response = await fetch('http://localhost:5000/api/circulars/upload', {
//                 method: 'POST',
//                 body: data,
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 alert(result.message);
//                 setFormData({
//                     department: '',
//                     title: '',
//                   //  date: '',
//                     description: '',
//                     pdf: null,
//                 });
//                 fileInputRef.current.value = '';
//             } else {
//                 alert(result.message || 'Upload failed');
//             }
//         } catch (error) {
//             console.error('Upload error:', error);
//             alert('Something went wrong while uploading');
//         }
//     };

//     const onLogout = () => {
//         localStorage.clear();
//         navigate('/ViewerDashboard');
//     };

//     return (
//         <div className="admin-dashboard">
//             <div className="topbar">
//                 <div className="dashboard-title">
//                     <img src={logo} alt="Logo" className="dashboard-logo" />
//                 </div>
//                 <h1 className="topbar-heading">JNPA Circulars</h1>
//                 <button className="logout-btn" onClick={onLogout}>Logout</button>
//             </div>

//             <div className="dashboard-body">
//                 <aside className="sidebar">
//                     <h2 className="sidebar-title">Panel</h2>
//                     <ul>
//                         <li onClick={() => navigate('/view-circulars1')}>View Circular</li>
//                         <li onClick={() => navigate('/ms-dashboard')}>Upload Circular</li>
//                     </ul>
//                 </aside>

//                 <main className="main-content">
//                     <h2 className="form-heading">Upload Circular</h2>

//                     <form onSubmit={handleSubmit} className="upload-form">
//                         <select
//                             name="department"
//                             value={formData.department}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="" hidden>Select Department</option>
//                             <option value="Finance">Finance</option>
//                             <option value="Legal">Legal</option>
//                             <option value="PPD">PPD</option>
//                             <option value="Management and Service">Management and Service</option>
//                             <option value="Vigilance">Vigilance</option>
//                             <option value="Marketing">Marketing</option>
//                         </select>

//                         <input
//                             type="text"
//                             name="title"
//                             placeholder="Title"
//                             value={formData.title}
//                             onChange={handleChange}
//                             required
//                         />

//                         <textarea

//                             style={{
//                                 resize: 'none',
//                                 width: '',
//                                 height: '100px'
//                             }}
//                             name="description"
//                             placeholder="Description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             required
//                         />

//                         {/* <input
//                             type="date"
//                             name="date"
//                             value={formData.date}
//                             onChange={handleChange}
//                             required
//                             min={new Date().toISOString().split('T')[0]} // sets minimum to today
//                         /> */}

//                         <input
//                             type="file"
//                             accept="application/pdf"
//                             ref={fileInputRef}
//                             onChange={handleFileChange}
//                             required
//                         />

//                         <button type="submit" className="upload-btn">Upload</button>
//                     </form>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default MsDashboard;

// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdminDashboard.css';
// import logo from './logo.png';

// const MsDashboard = () => {
//     const fileInputRef = useRef(null);
//     const navigate = useNavigate();

//     // 🔐 Redirect to login if user not found in localStorage
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (!user) {
//             navigate('/login'); // Change to your actual login route
//         }
//     }, [navigate]);

//     const [formData, setFormData] = useState({
//         department: '',
//         title: '',
//         description: '',
//         pdf: null,
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setFormData(prev => ({ ...prev, pdf: e.target.files[0] }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         data.append('department', formData.department);
//         data.append('title', formData.title);
//         data.append('description', formData.description);
//         data.append('pdf', formData.pdf);

//         try {
//             const response = await fetch('http://localhost:5000/api/circulars/upload', {
//                 method: 'POST',
//                 body: data,
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 alert(result.message);
//                 setFormData({
//                     department: '',
//                     title: '',
//                     description: '',
//                     pdf: null,
//                 });
//                 fileInputRef.current.value = '';
//             } else {
//                 alert(result.message || 'Upload failed');
//             }
//         } catch (error) {
//             console.error('Upload error:', error);
//             alert('Something went wrong while uploading');
//         }
//     };

//     // 🚪 Logout clears session and navigates to login
//     const onLogout = () => {
//         localStorage.clear();
//         navigate('/login'); // Make sure this is your login route
//     };

//     return (
//         <div className="admin-dashboard">
//             <div className="topbar">
//                 <div className="dashboard-title">
//                     <img src={logo} alt="Logo" className="dashboard-logo" />
//                 </div>
//                 <h1 className="topbar-heading">JNPA Circulars</h1>
//                 <button className="logout-btn" onClick={onLogout}>Logout</button>
//             </div>

//             <div className="dashboard-body">
//                 <aside className="sidebar">
//                     <h2 className="sidebar-title">Panel</h2>
//                     <ul>
//                         <li onClick={() => navigate('/view-circulars1')}>View Circular</li>
//                         <li onClick={() => navigate('/ms-dashboard')}>Upload Circular</li>
//                     </ul>
//                 </aside>

//                 <main className="main-content">
//                     <h2 className="form-heading">Upload Circular</h2>

//                     <form onSubmit={handleSubmit} className="upload-form">
//                         <select
//                             name="department"
//                             value={formData.department}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="" hidden>Select Department</option>
//                             <option value="Finance">Finance</option>
//                             <option value="Legal">Legal</option>
//                             <option value="PPD">PPD</option>
//                             <option value="Management and Service">Management and Service</option>
//                             <option value="Vigilance">Vigilance</option>
//                             <option value="Marketing">Marketing</option>
//                         </select>

//                         <input
//                             type="text"
//                             name="title"
//                             placeholder="Title"
//                             value={formData.title}
//                             onChange={handleChange}
//                             required
//                         />

//                         <textarea
//                             style={{
//                                 resize: 'none',
//                                 height: '100px'
//                             }}
//                             name="description"
//                             placeholder="Description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             required
//                         />

//                         <input
//                             type="file"
//                             accept="application/pdf"
//                             ref={fileInputRef}
//                             onChange={handleFileChange}
//                             required
//                         />

//                         <button type="submit" className="upload-btn">Upload</button>
//                     </form>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default MsDashboard;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import logo from './logo.png';

const MsDashboard = () => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // 🔐 Redirect to ViewerDashboard if user not found in localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/ViewerDashboard'); // 👈 Redirect to ViewerDashboard
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        department: '',
        title: '',
        description: '',
        pdf: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, pdf: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('department', formData.department);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('pdf', formData.pdf);

        try {
            const response = await fetch('http://localhost:5000/api/circulars/upload', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                setFormData({
                    department: '',
                    title: '',
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

    // 🚪 Logout clears session and navigates to ViewerDashboard
    const onLogout = () => {
        localStorage.clear();
        navigate('/ViewerDashboard'); // 👈 Go to ViewerDashboard on logout
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
                    <h2 className="form-heading">Upload Circular</h2>

                    <form onSubmit={handleSubmit} className="upload-form">
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="" hidden>Select Department</option>
                            <option value="Finance">Finance</option>
                            <option value="Legal">Legal</option>
                            <option value="PPD">PPD</option>
                            <option value="Management and Service">Management and Service</option>
                            <option value="Vigilance">Vigilance</option>
                            <option value="Marketing">Marketing</option>
                        </select>

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
                                height: '100px'
                            }}
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

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

export default MsDashboard;
