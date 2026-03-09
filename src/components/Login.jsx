import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from './logo.png';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password
        });

        alert(response.data.message);

        // ✅ Store the user in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));

        const role = response.data.user.role;

        if (role === 'admin') {
            navigate('/admin-dashboard');
        } else {
            navigate('/dept-dashboard');
        }
    } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
    }
};


    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="login-logo" />
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
<br />
                <button type="submit">Login</button>
                
                {/* <div className="extra-links">
                    <p><a href="/forgot-password">Forgot Password?</a></p>
                </div> */}
            </form>
        </div>
    );
};

export default Login;
