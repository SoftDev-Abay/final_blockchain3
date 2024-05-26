const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    bio: {
        type: String
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

userSchema.index({name: 'text'});

module.exports = mongoose.model('User', userSchema);
