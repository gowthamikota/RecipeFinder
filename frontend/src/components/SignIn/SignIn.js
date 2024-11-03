import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; // Import the CSS file for styling
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
const SignIn = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Login successful!');
                localStorage.setItem("user", JSON.stringify(data.user));
                console.log(data);
                dispatch(setUser(data.user));
                navigate('/dashboard');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <header className="signin-header">
                <h1>Whisk Your Way Back to Flavor Town!🌟</h1>
            </header>
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            {success && <div className="success-message">{success}</div>} {/* Display success message */}
            <form onSubmit={handleSubmit} className="signin-form">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email"
                    name="email" // Add name attribute
                    placeholder="Your secret ingredient" 
                    value={credentials.email} // Update to use credentials
                    onChange={handleChange} // Use handleChange for input
                    required 
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" // Add name attribute
                    placeholder="Your spice blend"
                    value={credentials.password} // Update to use credentials
                    onChange={handleChange} // Use handleChange for input
                    required 
                />
                <button type="submit" className="signin-button" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'} {/* Change button text based on loading state */}
                </button>
            </form>
            <p className="signin-footer">
                Don't have an account? <a href="/signup">Sign Up</a>
            </p>
        </div>
    );
};

export default SignIn;
