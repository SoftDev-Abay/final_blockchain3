const express = require('express');
const userRoutes = require('./user-routes');
const vacancyRoutes = require('./vacancy-routes');
const postRoutes = require('./post-routes')
const friendshipRoutes = require('./friendship-routes');

const router = express.Router();

router.use('/', userRoutes);
router.use('/post', postRoutes)
router.use('/friendship', friendshipRoutes);
router.use('/vacancies', vacancyRoutes);

module.exports = router;
