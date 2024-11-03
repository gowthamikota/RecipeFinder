// src/components/Dashboard/Dashboard.js
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import ProfileSection from './ProfileSection';
import MainSection from './MainSection';
import Footer from './Footer';
import './Dashboard.css';
import AddRecipe from '../AddRecipe/AddRecipe';
import UserRecipes from '../UserRecipes/UserRecipes';
import ExploreRecipes from '../ExploreRecipes/ExploreRecipes';
import MyRecipes from '../myRecipes/MyRecipes';
import MyFavourites from '../myFavourites/MyFavouries';

const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate();
    const username = JSON.parse(localStorage.getItem("user"))?.username; // Retrieve username from local storage

    const handleLogout = () => {
        onLogout();
        navigate('/signin');
    };

    return (
        <div className="dashboard-container">
            <Header onLogout={handleLogout} />
            <div className="dashboard-body">
                <ProfileSection username={username} />
                <Routes>
                    <Route path="/" element={<MainSection />} />
                    <Route path="add-recipe" element={<AddRecipe />} />
                    <Route path="user-recipes" element={<UserRecipes />} />
                    <Route path="explore-recipes" element={<ExploreRecipes username={username} />} />
                    <Route path="user-recipes/:userId" element={<MyRecipes username={username}/>} />
                    <Route path="favourites/:userId" element={<MyFavourites username={username}/>} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
