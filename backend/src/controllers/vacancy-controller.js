const Vacancy = require('../models/Vacancy-model'); // Ensure correct path

class VacancyController {
    async addVacancy(req, res) {
        try {
            const { title, information, contactEmail } = req.body;
			const author = req.user.userId; 

            const newVacancy = new Vacancy({
                title,
                information,
                contactEmail,
                author // Setting the author of the vacancy
            });

            await newVacancy.save();
            res.status(201).json({ message: "Vacancy created successfully!", vacancy: newVacancy });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }

	async getAllVacancies(req, res) {
        try {
            const vacancies = await Vacancy.find().populate({
                path: 'author',
                select: 'name profilePicture'  
            });
            res.status(200).json(vacancies);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    async getVacancyById(req, res) {
        try {
            const vacancy = await Vacancy.findById(req.params.id).populate({
                path: 'author',
                select: 'name profilePicture' 
            });
            if (!vacancy) {
                return res.status(404).json({ message: "Vacancy not found" });
            }
            res.json(vacancy);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }
    async updateVacancy(req, res) {
        try {
            const { title, information, contactEmail } = req.body;
            const vacancy = await Vacancy.findByIdAndUpdate(req.params.id, {
                title,
                information,
                contactEmail
            }, { new: true }).populate('author').populate('applied.userId');

            if (!vacancy) {
                return res.status(404).json({ message: "Vacancy not found" });
            }
            res.json({ message: "Vacancy updated successfully!", vacancy });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    async deleteVacancy(req, res) {
        try {
            const vacancy = await Vacancy.findByIdAndDelete(req.params.id);
            if (!vacancy) {
                return res.status(404).json({ message: "Vacancy not found" });
            }
            res.json({ message: "Vacancy deleted successfully!" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }

	async applyToVacancy(req, res) {
		try {
			const userId = req.user.userId;
			const vacancyId = req.params.id;
			const vacancy = await Vacancy.findById(vacancyId);
	
			if (!vacancy) {
				return res.status(404).json({ message: "Vacancy not found" });
			}
	
			if (vacancy.applied.some(application => application.userId.toString() === userId.toString())) {
				return res.status(400).json({ message: "You have already applied to this vacancy." });
			}
	
			vacancy.applied.push({ userId, dateApplied: new Date() }); // Adding dateApplied for better tracking
			await vacancy.save();
	
			res.json({ message: "Applied successfully!", vacancy });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Server error" });
		}
	}
	
}

module.exports = new VacancyController();
