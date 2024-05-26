const express = require('express');
const userController = require('../controllers/user-controller');
const { verifyToken } = require('../middlewares/auth-middleware');
const validateObjectId = require('../middlewares/validateObjectId');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/refresh-token', userController.refreshToken);
router.get('/profile/me', verifyToken, userController.getMyProfile);
router.get('/friends', verifyToken, userController.getMyFriends);
router.get('/search', verifyToken, userController.searchUsers);
router.get('/:id', verifyToken, validateObjectId, userController.getUserData);

module.exports = router;
