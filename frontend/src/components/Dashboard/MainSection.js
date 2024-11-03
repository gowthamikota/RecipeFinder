import React from 'react';
import './MainSection.css';

const MainSection = () => {
    return (
        <div className="main-section">
            <h2>Recipes suggested for your apetite</h2>
            <div className="recipe-cards">
                <div className="recipe-card">
                    <h3>Spaghetti Carbonara</h3>
                    <p>A classic Italian pasta dish.</p>
                    <button className="view-recipe-button">View Recipe</button>
                </div>
                <div className="recipe-card">
                    <h3>Chicken Tikka Masala</h3>
                    <p>Grilled chunks of marinated chicken.</p>
                    <button className="view-recipe-button">View Recipe</button>
                </div>
                <div className="recipe-card">
                    <h3>Vegetable Stir-Fry</h3>
                    <p>A colorful mix of stir-fried vegetables.</p>
                    <button className="view-recipe-button">View Recipe</button>
                </div>
            </div>
        </div>
    );
};

export default MainSection;
