const express = require('express');
const userRoutes = require('./userRoutes');
const vacancyRoutes = require('./vacancyRoutes');

const router = express.Router();

router.use('/', userRoutes);
router.use('/vacancies', vacancyRoutes);

module.exports = router;
