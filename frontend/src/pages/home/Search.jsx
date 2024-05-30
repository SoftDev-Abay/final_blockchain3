import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Searchbar from '../../components/Searchbar';
import UserCard from '../../components/UserCard';
import { useSearchUsersQuery } from '../../features/users/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [result, setResult] = useState([]);

    const [searchString, setSearchString] = useState('');

    const navigate = useNavigate();

    const { data, error, isSuccess, isLoading } =
        useSearchUsersQuery(searchString);

    useEffect(() => {
        if (isSuccess) {
            setResult([...data]);
        }
    }, [searchString]);

    console.log('result', result);
    console.log('data', data);

    const onViewProfile = (id) => {
        navigate(`/user-profile/${id}`);
    };
    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>

            <Searchbar
                routeType="search"
                searchString={searchString}
                setSearchString={setSearchString}
            />

            <div className="mt-14 flex flex-col gap-9">
                {isLoading ? (
                    <div className="flex justify-center">
                        <PulseLoader color={'#FFF'} />
                    </div>
                ) : error ? (
                    <p className="no-result">{error.message}</p>
                ) : isSuccess && result.length === 0 ? (
                    <p className="no-result">No Result</p>
                ) : (
                    isSuccess && (
                        <>
                            {result.map((person) => (
                                <UserCard
                                    key={person._id}
                                    id={person.id}
                                    name={person.name}
                                    email={person.email}
                                    imgUrl={person.profilePicture}
                                    isFriend={false}
                                    onView={() => onViewProfile(person._id)}
                                />
                            ))}
                        </>
                    )
                )}
            </div>
        </section>
    );
}

export default Search;
