const express = require('express');
const userRoutes = require('./user-routes');
const vacancyRoutes = require('./vacancy-routes');
const friendshipRoutes = require('./friendship-routes');

const router = express.Router();

router.use('/', userRoutes);
router.use('/friendship', friendshipRoutes);
router.use('/vacancies', vacancyRoutes);

module.exports = router;
