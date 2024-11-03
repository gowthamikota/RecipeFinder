import React, { useState, useEffect } from "react";
import "./AddRecipe.css";
import axios from "axios";
import { useSelector } from "react-redux";

const AddRecipe = ({ username, onLogout }) => {
    const user = useSelector((state) => state.user);
    console.log(user);

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: "",
        instructions: "",
        dietaryTags: "",
    });

    // Set the userId once it becomes available
    useEffect(() => {
        if (user._id) {
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                userId: user._id,
            }));
        }
    }, [user._id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/add-recipe",
                recipe,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
            // navigate('/recipes');
        } catch (error) {
            console.error(
                "Error adding recipe:",
                error.response?.data?.message || error.message
            );
        }

        setRecipe({
            name: "",
            ingredients: "",
            instructions: "",
            dietaryTags: "",
        });
    };

    return (
        <div className="add-body">
            <div className="add-recipe-container">
                <h2>Add a New Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Recipe Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={recipe.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredients">Ingredients:</label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            value={recipe.ingredients}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="instructions">Instructions:</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            value={recipe.instructions}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dietaryTags">
                            Dietary Tags (comma separated):
                        </label>
                        <input
                            type="text"
                            id="dietaryTags"
                            name="dietaryTags"
                            value={recipe.dietaryTags}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Add Recipe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;
