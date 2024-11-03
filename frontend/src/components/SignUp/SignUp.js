import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './signUp.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

const Signup = () => {
    const dispatch=useDispatch();
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      try {
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        dispatch(setUser(data.user));
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        console.log(data.user);
        navigate('/dashboard');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: ''
        });
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h1 className="signup-title">Join Our Culinary Community!</h1>
                <form onSubmit={handleSubmit}> {/* Attach handleSubmit to the form */}
                    <label className="input-label">First Name</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        placeholder="Enter First Name" 
                        className="input-field" 
                        required 
                    />

                    <label className="input-label">Last Name</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        placeholder="Enter Last Name" 
                        className="input-field" 
                        required 
                    />

                    <label className="input-label">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        placeholder="Choose a Username" 
                        className="input-field" 
                        required 
                    />

                    <label className="input-label">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Enter Your Email" 
                        className="input-field" 
                        required 
                    />

                    <label className="input-label">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Create a Password" 
                        className="input-field" 
                        required 
                    />

                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;