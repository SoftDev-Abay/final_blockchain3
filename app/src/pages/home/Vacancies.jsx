import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VacanciesList = ({ vacancies }) => {
    return (
        <div className="flex flex-col">
            {vacancies.map((vacancy) => (
                <div
                    key={vacancy._id}
                    className="bg-slate-500 p-4 rounded-md shadow-md flex justify-between items-center mb-4"
                >
                    <div>
                        <h3 className="text-xl font-semibold">
                            {vacancy.title}
                        </h3>
                        <p className="text-sm text-white">
                            {vacancy.information}
                        </p>
                        <p
                            className="text-sm 
                    text-white
                    "
                        >
                            Contact: {vacancy.contactEmail}
                        </p>
                    </div>
                    <div className="mt-4">
                        <Link to={`/vacancy/${vacancy._id}`}>
                            <button className="btn bg-slate-300 px-4 py-2 rounded-md">
                                View
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

//  mock data
const vacancies = [
    {
        _id: '1',
        title: 'Vacancy 1',
        information: 'Information about vacancy 1',
        contactEmail: 'email',
    },
    {
        _id: '2',
        title: 'Vacancy 2',
        information: 'Information about vacancy 2',
        contactEmail: 'email',
    },
    {
        _id: '3',
        title: 'Vacancy 3',
        information: 'Information about vacancy 3',
        contactEmail: 'email',
    },
];

const Vacancies = () => {
    let content;

    const data = vacancies;

    if (data.length === 0)
        content = <p className="text-center">No vacancies available.</p>;
    else content = <VacanciesList vacancies={data} />;

    return (
        <section>
            <h1 className="text-heading4-medium mb-10">Vacancies</h1>
            {/* main content */}
            {content}
        </section>
    );
};

export default Vacancies;
