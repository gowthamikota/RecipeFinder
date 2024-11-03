const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/user'); 
const Recipe = require('./models/recipes'); 
const multer = require('multer'); // Include multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Set up multer for file uploads

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bg', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Middleware to authenticate users
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Store user information in the request
        next();
    });
};

// ========================
// AUTHENTICATION ROUTES
// ========================

// Register route
app.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        const { email, firstName, lastName, username, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists. Please try logging in.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            firstName,
            lastName,
            username,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
        res.status(201).json({ message: 'Signup successful.', token, user: newUser });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Login route
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Received email:', email); // Log the email received from the request
        console.log('Request body:', req.body); // Log the complete request body

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found'); // Log if the user is not found
            return res.status(400).json({ message: "Invalid Username or Email" });
        }

        console.log('User found:', user); // Log the user object

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log('Incorrect password'); // Log if the password is incorrect
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
        console.log('Signing in user:', user); // Log the user object before sending the response
        res.status(200).json({ status: 'ok', token, user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// ========================
// RECIPE ROUTES
// ========================

// Create a recipe (authenticated)
app.post('/add-recipe', async (req, res) => {
    try {
        const { name, ingredients, instructions, dietaryTags = '', userId } = req.body;
        console.log(req.body)
        // Validation check for required fields
        if (!name || !ingredients || !instructions) {
            return res.status(400).json({ message: 'Name, ingredients, and instructions are required.' });
        }

        const newRecipe = new Recipe({
            name,
            createdBy: null, // Set createdBy to null if not needed
            ingredients: ingredients.split(','), // Assume ingredients is a comma-separated string
            instructions,
            dietaryTags: dietaryTags ? dietaryTags.split(',') : [],
            userId // Convert dietaryTags to an array
        });

        // Save the new recipe to the database
        await newRecipe.save();
        console.log("saved successfully")
        res.status(201).json({ message: 'Recipe created successfully.', recipeId: newRecipe._id });
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Get all recipes
// Middleware to check authentication (if using JWT)
const authenticate = (req, res, next) => {
    // Logic to verify the token and extract user ID
    // Assuming req.user is populated with user data after authentication
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// Fetch recipes for the authenticated user
app.get('/user-recipes/:userId', async (req, res) => {
    try {
        const {userId }= req.params
        console.log(userId) // Get the user ID from the authenticated user
        const recipes = await Recipe.find({ userId }).populate('userId', 'username');
        console.log(recipes) // Filter by userId
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

app.get('/explore-recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetch all recipes from the database
        res.status(200).json(recipes); // Return recipes as JSON
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


// Explore recipes by dietary tag
app.get('/recipes/explore/:tag', async (req, res) => {
    try {
        const { tag } = req.params;
        const recipes = await Recipe.find({ dietaryTags: tag }).populate('userId', 'username');

        if (recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found for this tag.' });
        }

        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes by tag:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Search for recipes by name or ingredient
app.get('/recipes/search', async (req, res) => {
    try {
        const { query } = req.query; // Query string parameter for searching
        const recipes = await Recipe.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Search by recipe name (case insensitive)
                { ingredients: { $regex: query, $options: 'i' } } // Search by ingredient (case insensitive)
            ]
        }).populate('userId', 'username');

        if (recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found matching your query.' });
        }

        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error searching recipes:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

app.post("/favourites/:userId/:recipeId", async (req, res) => {
    const { userId, recipeId } = req.params;
    console.log(userId)
    console.log(recipeId)
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if recipeId is already in favourites
        const isFavourite = user.favourites.includes(recipeId);

        if (isFavourite) {
            // Remove from favourites
            user.favourites = user.favourites.filter(
                (favId) => favId.toString() !== recipeId
            );
        } else {
            // Add to favourites
            user.favourites.push(recipeId);
        }

        await user.save();
        res.status(200).json({
            message: isFavourite ? "Recipe removed from favourites" : "Recipe added to favourites",
            favourites: user.favourites,
        });
    } catch (error) {
        console.error("Error toggling favourite:", error);
        res.status(500).json({ message: "Server error while toggling favourite" });
    }
});

app.get("/favourites/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate("favourites");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user.favourites);
    } catch (error) {
        console.error("Error fetching favourite recipes:", error);
        res.status(500).json({ message: "Server error while fetching favourite recipes" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
