import React from 'react';

const Vacancy = () => {
    // Static data example for the vacancy
    const data = {
        id: '1',
        title: 'Senior React Developer',
        information:
            'We are looking for a Senior React Developer to join our team.',
        contactEmail: 'hr@example.com',
        author: {
            name: 'John Doe',
        },
        applied: [
            { userId: '123' }, // Example user ID who has applied
        ],
    };

    // Static user data
    const user = {
        _id: '123', // Example logged in user ID
    };

    const alreadyApplied = data.applied.some(
        (application) => application.userId === user._id
    );

    let content = (
        <div className="bg-slate-200 shadow-lg rounded-lg p-6 mt-5">
            <h2 className="text-heading2-bold mb-4">{data.title}</h2>
            <p className="text-body-normal mb-4">{data.information}</p>
            <div className="mb-4">
                <span className="text-base-semibold">Contact: </span>
                <a
                    href={`mailto:${data.contactEmail}`}
                    className="text-blue-500 hover:underline"
                >
                    {data.contactEmail}
                </a>
            </div>
            <div className="mb-4">
                <span className="text-base-semibold">Posted by: </span>
                <span className="text-base-medium">{data.author.name}</span>
            </div>
            {alreadyApplied ? (
                <p className="text-red-500">
                    You have already applied to this vacancy.
                </p>
            ) : (
                <button
                    className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-150 ease-in-out"
                    disabled={true} // Disable the button as this is a static example
                >
                    Apply
                </button>
            )}
        </div>
    );

    return (
        <section>
            <h1 className="text-heading4-medium mb-10">Vacancy Details</h1>
            {content}
        </section>
    );
};

export default Vacancy;
