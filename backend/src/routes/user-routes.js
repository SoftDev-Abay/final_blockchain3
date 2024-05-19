const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken);
router.get('/:id', verifyToken, userController.getUserData);  
router.get('/profile/me', verifyToken, userController.getMyProfile);

module.exports = router;
