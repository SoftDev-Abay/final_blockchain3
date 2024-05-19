const Vacancy = require('../models/Vacancy-model');

class VacancyController {
    async addVacancy(req, res) {
        try {
            const { title, information, contactEmail } = req.body;

            const newVacancy = new Vacancy({
                title,
                information,
                contactEmail
            });

            await newVacancy.save();
            res.status(201).json(newVacancy);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async removeVacancy(req, res) {
        try {
            const { id } = req.params;

            const vacancy = await Vacancy.findByIdAndDelete(id);

            if (!vacancy) {
                return res.status(404).json({ message: 'Vacancy not found' });
            }

            res.status(200).json({ message: 'Vacancy removed successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async updateVacancy(req, res) {
        try {
            const { id } = req.params;
            const { title, information, contactEmail } = req.body;

            const vacancy = await Vacancy.findByIdAndUpdate(
                id,
                { title, information, contactEmail },
                { new: true, runValidators: true }
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

    async getAllVacancies(req, res) {
        try {
            const vacancies = await Vacancy.find();

            res.status(200).json(vacancies);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new VacancyController();
