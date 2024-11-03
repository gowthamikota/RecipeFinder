const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
}, { timestamps: true }); // Timestamps for createdAt and updatedAt

const User = mongoose.model('User', userSchema);
module.exports = User;