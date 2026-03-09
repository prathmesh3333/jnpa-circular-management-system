import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DepartmentDashboard from './components/DepartmentDashboard';
import ViewerDashboard from './components/ViewerDashboard';
import MsDashboard from './components/MsDashboard';
import ViewCirculars from './components/ViewCirculars';
import AdminViewCirculars from './components/AdminViewCirculars'; // import this
import ViewCirculars1 from './components/ViewCirculars1';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ViewerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<MsDashboard />} />
          <Route path="/dept-dashboard" element={<DepartmentDashboard />} />
          <Route path="/view-circulars" element={<ViewCirculars />} /> {/* for department users */}
          <Route path="/admin-view-circulars" element={<AdminViewCirculars />} /> {/* for admin */}
          <Route path="/ViewerDashboard" element={<ViewerDashboard />} />
          <Route path="/ms-dashboard" element={<MsDashboard />} />
          <Route path="/view-circulars1" element={<ViewCirculars1 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
