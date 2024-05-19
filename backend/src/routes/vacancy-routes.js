const express = require('express');
const vacancyController = require('../controllers/vacancyController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken);

router.get('/', vacancyController.getAllVacancies);
router.post('/', vacancyController.addVacancy);
router.put('/:id', vacancyController.updateVacancy);
router.delete('/:id', vacancyController.removeVacancy);

module.exports = router;
