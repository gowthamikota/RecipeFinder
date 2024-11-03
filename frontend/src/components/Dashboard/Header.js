import React from 'react';
import './Header.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
    const user = useSelector((state) => state.user);
    console.log(user);
    return (
        <header className="dashboard-header">
            <div className="logo">CookBook🍽️</div>
            <nav className="nav-links">
                <Link to="/dashboard">Home</Link> {/* Link to the home page */}
                <Link to="/dashboard/add-recipe">Add Recipes</Link>
                <Link to="/dashboard/explore-recipes">Explore Recipes</Link>
                <Link to={`/dashboard/user-recipes/${user._id}`}>My Recipes</Link>
                <Link to={`/dashboard/favourites/${user._id}`}>Favourite Recipes</Link>
            </nav>
           
            <button className="logout-button" onClick={onLogout}>Logout</button>
        </header>
    );
};

export default Header;
