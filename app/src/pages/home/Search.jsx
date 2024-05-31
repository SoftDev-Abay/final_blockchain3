import React, { useEffect, useState } from 'react';
import Searchbar from '../../components/Searchbar';
import UserCard from '../../components/UserCard';
import { useHistory } from 'react-router-dom';

import { useBlog } from 'src/context/Blog';
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';

function Search() {
    const [searchString, setSearchString] = useState('');

    const history = useHistory();

    const { userAccounts, user } = useBlog();

    const transformedUserAccounts = userAccounts
        .map((user) => {
            const transUser = {
                ...user.account,
                publicKey: user.publicKey.toBase58(),
            };
            return transUser;
        })
        .filter(
            (userAccount) =>
                userAccount.publicKey !== user.publicKey &&
                userAccount.name
                    .toLowerCase()
                    .includes(searchString.toLowerCase())
        );

    console.log('transformedUserAccounts', transformedUserAccounts);

    const onViewProfile = (id) => {
        history.push(`/user-profile/${id}`);
    };

    return (
        <section>
            <h1 className="text-heading4-medium mb-10">Search</h1>

            <Searchbar
                routeType="search"
                searchString={searchString}
                setSearchString={setSearchString}
            />

            <div className="mt-14 flex flex-col gap-9">
                {transformedUserAccounts.length === 0 ? (
                    <p className="no-result">No Result</p>
                ) : (
                    <>
                        {transformedUserAccounts.map((person, index) => (
                            <UserCard
                                key={'person.id' + person.name + index}
                                publicKey={person.publicKey}
                                name={person.name}
                                imgUrl={person.avatar}
                                isFriend={false}
                                onView={() => onViewProfile(person.publicKey)}
                                buttonAction={true}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}

export default Search;
