const express = require('express');
const vacancyController = require('../controllers/vacancy-controller');
const { verifyToken } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use(verifyToken);

router.get('/all', vacancyController.getAllVacancies);
router.post('/create', vacancyController.addVacancy);
router.put('/:id', vacancyController.applyToVacancy);
router.get('/:id', vacancyController.getVacancyById)
// router.put('/:id', vacancyController.updateVacancy);
router.delete('/:id', vacancyController.deleteVacancy);

module.exports = router;
