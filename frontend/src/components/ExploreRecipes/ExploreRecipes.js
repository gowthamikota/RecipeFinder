import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExploreRecipes.css";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";

const ExploreRecipes = ({ onLogout, username }) => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.user);
    const userId = user._id;

    const toggleFavourite = async (recipeId, isFavourite) => {
        try {
            // Send request to backend to update favourite status
            await axios.post(`http://localhost:5000/favourites/${userId}/${recipeId}`)
            
            // Update local state
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe._id === recipeId
                        ? { ...recipe, isFavourite: !isFavourite }
                        : recipe
                )
            );
        } catch (err) {
            console.error("Error updating favourite status:", err);
            setError(
                "An error occurred while updating favourite status."
            );
        }
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/explore-recipes"
                );
                setRecipes(response.data);
            } catch (err) {
                console.error("Error fetching recipes:", err);
                setError(
                    err.response?.data?.message ||
                        "An error occurred while fetching recipes."
                );
            }
        };
        fetchRecipes();
    }, [setRecipes]);
    console.log(recipes);
    return (
        <div className="explorerecipes-container">
            {username && <h1 className="welcome-message">Welcome, {username}!</h1>}
            {error && <p className="error">{error}</p>}
            <div className="recipes-grid">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe._id} className="recipe-card">
                            <img
                                src="../../../logo192.png"
                                alt={recipe.name}
                                className="recipe-image"
                            />
                            <div className="recipe-details">
                                <h3 className="recipe-title">{recipe.name}</h3>
                                <p className="recipe-section">
                                    <strong>Ingredients:</strong> {recipe.ingredients}
                                </p>
                                <p className="recipe-section">
                                    <strong>Instructions:</strong> {recipe.instructions}
                                </p>
                                <p className="recipe-section">
                                    <strong>Dietary Tags:</strong> {recipe.dietaryTags}
                                </p>
                            </div>
                            <Heart
                                size={24}
                                color={recipe.isFavourite ? "red" : "gray"}
                                style={{ cursor: "pointer" }}
                                onClick={() => toggleFavourite(recipe._id, recipe.isFavourite)}
                            />
                        </div>
                    ))
                ) : (
                    <p>No recipes found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default ExploreRecipes;
