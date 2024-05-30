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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applied: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        dateApplied: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('Vacancy', vacancySchema);
