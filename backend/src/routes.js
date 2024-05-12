const express = require('express');
const userController = require('./controllers/user-controller');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: "everything works fine!"});
})
router.post('/register', userController.register)
router.post('/login', userController.login)


module.exports = router;