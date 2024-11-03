// src/App.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import { setUser } from './redux/slices/userSlice';

import './App.css';

function App() {
    const [username, setUsername] = useState(null); // Manage the username state
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (storedUser) {
                    setUsername(storedUser.username);
                    setIsLoggedIn(true);
                    dispatch(setUser(storedUser));
                }
            } catch (error) {
                console.log("Error checking auth", error);
            }
        };

        checkAuth();
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear user data from local storage
        setUsername(null);
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard/*" element={<Dashboard onLogout={handleLogout} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
