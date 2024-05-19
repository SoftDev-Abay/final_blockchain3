const Vacancy = require('../models/Vacancy-model');

class VacancyService {
    async createVacancy(data) {
        const newVacancy = new Vacancy(data);
        await newVacancy.save();
        return newVacancy;
    }

    async deleteVacancy(vacancyId) {
        return await Vacancy.findByIdAndDelete(vacancyId);
    }

    async updateVacancy(vacancyId, data) {
        return await Vacancy.findByIdAndUpdate(vacancyId, data, { new: true, runValidators: true });
    }

    async getAllVacancies() {
        return await Vacancy.find();
    }
}

module.exports = new VacancyService();
