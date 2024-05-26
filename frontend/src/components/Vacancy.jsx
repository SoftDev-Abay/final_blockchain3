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
        <div>
            <h1>Vacancy</h1>

            <p>id: {id}</p>
        </div>
    );
};

export default Vacancy;
