const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    information: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Vacancy', vacancySchema);
