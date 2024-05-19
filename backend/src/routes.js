const express = require('express');
const userController = require('./controllers/user-controller');
const vacancyController = require('./controllers/vacancy-controller');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: "everything works fine!"});
})
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/api/vacancies', vacancyController.getAllVacancies)
router.post('/api/vacancies', vacancyController.addVacancy)
router.put('/api/vacancies/:id', vacancyController.updateVacancy)
router.delete('/api/vacancies/:id', vacancyController.removeVacancy)

module.exports = router;