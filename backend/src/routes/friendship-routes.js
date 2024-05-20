const express = require('express');
const friendshipController = require('../controllers/friendship-controller');
const { verifyToken } = require('../middlewares/auth-middleware');

const router = express.Router();

router.post('/send-request', verifyToken, friendshipController.sendFriendRequest);
router.post('/accept-request', verifyToken, friendshipController.acceptFriendRequest);
router.get('/requests', verifyToken, friendshipController.getFriendRequests);

module.exports = router;
