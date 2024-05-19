const User = require('../models/User-model');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/bcrypt-util');

class AuthService {
  async register(userData) {
    userData.password = await hashPassword(userData.password);
    const newUser = new User(userData);
    return newUser.save();
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, user };
  }

  async refresh(token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(payload.userId);
      if (!user || user.refreshToken !== token) {
        throw new Error('Access denied');
      }

      const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
      const newRefreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

      user.refreshToken = newRefreshToken;
      await user.save();

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error('Token is invalid or expired');
    }
  }
}

module.exports = new AuthService();
