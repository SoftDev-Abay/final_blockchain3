import React, { useState, useEffect } from 'react';
import { useCreateVacancyMutation } from '../../features/vacancies/vacanciesApiSlice';

function CreateVacancy() {
    const [title, setTitle] = useState('');
    const [information, setInformation] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    const [createVacancy, { isLoading, error, isSuccess }] =
        useCreateVacancyMutation();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!title.trim() || !information.trim() || !contactEmail.trim()) {
            alert('All fields must be filled!');
            return;
        }

        const vacancyData = {
            title,
            information,
            contactEmail,
        };

        createVacancy(vacancyData);
    };

    useEffect(() => {
        if (isSuccess) {
            setTitle('');
            setInformation('');
            setContactEmail('');
            alert('Vacancy created successfully');
        }
    }, [isSuccess]);

    return (
        <section className="p-6">
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label className="block text-white text-base-semibold">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded p-2"
                    placeholder="Enter vacancy title"
                />

                <label className="block text-white text-base-semibold">
                    Information
                </label>
                <textarea
                    rows="5"
                    value={information}
                    onChange={(e) => setInformation(e.target.value)}
                    className="border border-gray-300 rounded p-2"
                    placeholder="Describe the vacancy details"
                />

                <label className="block text-white text-base-semibold">
                    Contact Email
                </label>
                <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="border border-gray-300 rounded p-2"
                    placeholder="Enter contact email"
                />

                <button
                    type="submit"
                    className="bg-primary-500 mt-10 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-150 ease-in-out"
                    disabled={isLoading}
                >
                    Create Vacancy
                </button>
            </form>
        </section>
    );
}

export default CreateVacancy;
