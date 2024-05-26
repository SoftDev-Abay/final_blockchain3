import React from 'react';
import { useParams } from 'react-router-dom';

// vacancy:
// title:
// information:
// contactEmail:
// author : _id, name, profilePicture

const Vacancy = () => {
    const { id } = useParams();

    return (
        <section>
            <h1 className="head-text mb-10">Vacancy</h1>
        </section>
    );
};

export default Vacancy;
