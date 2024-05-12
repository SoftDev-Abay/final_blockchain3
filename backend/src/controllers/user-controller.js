const User = require('../models/User-model');
const AuthService = require('../services/auth-service');

class UserController {
    async register(req, res){
        try {
            const { name, email, password, bio, profilePicture } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const newUser = await AuthService.register({ name, email, password, bio, profilePicture });
            res.status(201).json({ message: 'User created successfully!', user: newUser });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async login (req, res){
        try {
            const { email, password } = req.body;

            const { user, token } = await AuthService.login(email, password);
            res.json({ message: 'Login successful!', user, token });
        } catch (err) {
            console.error(err);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
}

module.exports = new UserController();