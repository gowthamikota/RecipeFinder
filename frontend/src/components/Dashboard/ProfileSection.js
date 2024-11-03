import React from 'react';
import { useSelector } from "react-redux";
import './ProfileSection.css';

const ProfileSection = () => {
    const user = useSelector((state) => state.user);

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src="profile-pic.jpg" // Replace with actual user profile picture URL
                    alt="Profile"
                    className="profile-pic"
                />
                <h1 className="username">@{user.username}</h1>
            </div>
            <div className="profile-content">
                <div className="profile-details">
                    <h2>We know your!</h2>
                    <div className="detail-box">
                        <span className="detail-label">First Name:</span>
                        <span className="detail-value">{user.firstName}</span>
                    </div>
                    <div className="detail-box">
                        <span className="detail-label">Last Name:</span>
                        <span className="detail-value">{user.lastName}</span>
                    </div>
                    <div className="detail-box">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{user.email}</span>
                    </div>
                </div>
                <a href="/settings" className="profile-button">Settings</a>
            </div>
        </div>
    );
};

export default ProfileSection;
