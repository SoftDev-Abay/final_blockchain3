const VacancyService = require('../services/vacancy-service');

class VacancyController {
	async addVacancy(req, res) {
		try {
			const vacancy = await VacancyService.createVacancy(req.body);
			res.status(201).json(vacancy);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Server error' });
		}
	}

	async getAllVacancies(req, res) {
		try {
			const vacancies = await VacancyService.getAllVacancies();
			res.status(200).json(vacancies);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Server error' });
		}
	}

	async updateVacancy(req, res) {
		try {
			const vacancy = await VacancyService.updateVacancy(
				req.params.id,
				req.body
			);
			if (!vacancy) {
				return res.status(404).json({ message: 'Vacancy not found' });
			}
			res.status(200).json(vacancy);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Server error' });
		}
	}

	async removeVacancy(req, res) {
		try {
			const vacancy = await VacancyService.deleteVacancy(req.params.id);
			if (!vacancy) {
				return res.status(404).json({ message: 'Vacancy not found' });
			}
			res.status(200).json({ message: 'Vacancy removed successfully' });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Server error' });
		}
	}
}

module.exports = new VacancyController();
