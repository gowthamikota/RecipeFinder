import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserRecipes.css';
import Header from '../Dashboard/Header';
import ProfileSection from '../Dashboard/ProfileSection';

const UserRecipes = ({ username, onLogout }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user-recipes', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust if using tokens
                    }
                });
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header onLogout={onLogout} />
            <div className="dashboard-body">
                <ProfileSection username={username} />
                <div className="user-recipes-container">
                    <h2>Your Recipes</h2>
                    {recipes.length > 0 ? (
                        <ul className="recipe-list">
                            {recipes.map((recipe) => (
                                <li key={recipe._id} className="recipe-item">
                                    <h3>{recipe.title}</h3>
                                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                                    <p><strong>Dietary Tags:</strong> {recipe.dietaryTags}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No recipes found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserRecipes;
