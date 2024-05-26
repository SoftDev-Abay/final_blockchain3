import React, { useState, useEffect } from 'react';
import { useGetAllVacanciesQuery } from '../../features/vacancies/vacanciesApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';

// vacancy:
// title:
// information:
// contactEmail:

const VacanciesList = ({ vacancies }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vacancies.map((vacancy) => (
                <div
                    key={vacancy._id}
                    className="bg-white p-4 rounded-md shadow-md"
                >
                    <h2 className="text-xl font-bold text-gray-800">
                        {vacancy.title}
                    </h2>
                    <p className="text-gray-600">{vacancy.information}</p>
                    <p className="text-gray-600">{vacancy.contactEmail}</p>
                </div>
            ))}
        </div>
    );
};

const Vacancies = () => {
    const { data: vacancies = [], isFetching } = useGetAllVacanciesQuery();

    let content;

    if (isFetching) {
        content = (
            <div className="flex justify-center">
                <PulseLoader color={'#FFF'} />
            </div>
        );
    } else if (!vacancies.length) {
        content = <p className="text-center">No vacancies available.</p>;
    } else {
        content = <VacanciesList vacancies={vacancies} />;
    }

    return (
        <section>
            <h1 className="head-text mb-10">Vacancies</h1>
            {/* main content */}
            {content}
        </section>
    );
};

export default Vacancies;
