import React from 'react';
import { useParams } from 'react-router-dom';
import {
    useGetVacancyByIdQuery,
    useApplyToVacancyMutation,
} from '../features/vacancies/vacanciesApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const Vacancy = () => {
    const { id } = useParams();
    const { data, isFetching, isSuccess } = useGetVacancyByIdQuery(id);
    const [
        applyToVacancy,
        { isLoading: isApplying, isSuccess: isApplySuccess },
    ] = useApplyToVacancyMutation();

    let content;

    if (isFetching) {
        content = (
            <div className="flex justify-center items-center h-screen">
                <PulseLoader color={'#4A5568'} size={10} />
            </div>
        );
    }

    if (isSuccess) {
        const { title, information, contactEmail, author } = data;

        const alreadyApplied = data.applied.some(
            (application) => application.userId === author._id
        );

        content = (
            <div className="bg-slate-200 shadow-lg rounded-lg p-6 mt-5">
                <h2 className="text-heading2-bold mb-4">{title}</h2>
                <p className="text-body-normal mb-4">{information}</p>
                <div className="mb-4">
                    <span className="text-base-semibold">Contact: </span>
                    <a
                        href={`mailto:${contactEmail}`}
                        className="text-blue-500 hover:underline"
                    >
                        {contactEmail}
                    </a>
                </div>
                <div className="mb-4">
                    <span className="text-base-semibold">Posted by: </span>
                    <span className="text-base-medium">{author.name}</span>
                </div>
                {alreadyApplied ? (
                    <p className="text-red-500">
                        You have already applied to this vacancy.
                    </p>
                ) : (
                    <button
                        className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-150 ease-in-out"
                        onClick={() => applyToVacancy(id)}
                        disabled={isApplying || isApplySuccess}
                    >
                        {isApplying
                            ? 'Applying...'
                            : isApplySuccess
                            ? 'Applied'
                            : 'Apply'}
                    </button>
                )}
            </div>
        );
    }

    return (
        <section>
            <h1 className="head-text mb-10">Vacancy Details</h1>
            {content}
        </section>
    );
};

export default Vacancy;
