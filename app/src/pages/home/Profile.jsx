import ProfileHeader from '../../shared/ProfileHeader';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBlog } from 'src/context/Blog';
import { get } from 'lodash-es';

function Profile() {
    const { getPersonByPublicKey, user } = useBlog();

    if (!user) {
        return <p>Loading...</p>;
    }

    console.log('user', user);

    const handleButtonSubmit = () => {};

    const friends = user.friends
        .map((friendKey) => {
            console.log('friendKey', friendKey.toBase58());
            return getPersonByPublicKey(friendKey.toBase58());
        })
        .filter((friend) => friend !== undefined);

    return (
        <section>
            <ProfileHeader
                authUserId={user?.id}
                name={user?.name}
                imgUrl={user?.avatar}
                bio={user?.bio}
                handleButtonSubmit={handleButtonSubmit}
                isSendingFriendRequest={false}
                isFriend={false}
                type="profile"
            />

            <div>
                <h2 className="head-text">Friends</h2>
                <div className="grid grid-cols-3 gap-4">
                    {friends.map((friend, index) => (
                        <div
                            key={'friend' + index + friend.account.name}
                            className="flex flex-col items-center"
                        >
                            <img
                                src={friend.account.avatar}
                                alt="avatar"
                                className="w-16 h-16 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
                            />
                            <p className="text-light-1">
                                {friend.account.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Profile;
