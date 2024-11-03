const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    dietaryTags: { type: [String], required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Ensure this line exists
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
