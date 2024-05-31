import ProfileHeader from '../../shared/ProfileHeader';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBlog } from 'src/context/Blog';
import { get } from 'lodash-es';
import { Link } from 'react-router-dom';
// mock data
const user = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe.15@gmail.com',
    profilePicture: '',
    bio: "I'm a software engineer and a tech enthusiast.",
};

function UserProfile() {
    const userPublicKey = useParams().publicKey;

    const {
        getPersonByPublicKey,
        sendFriendRequest,
        user: currentUser,
    } = useBlog();

    const userFromApi = getPersonByPublicKey(userPublicKey);

    const transformedUserFromApi = {
        ...userFromApi.account,
        publicKey: userFromApi.publicKey.toBase58(),
        objPublicKey: userFromApi.publicKey,
    };

    const isFriend =
        currentUser.friends.filter((friendKey) =>
            friendKey.equals(transformedUserFromApi.objPublicKey)
        ).length > 0;

    const handleButtonSubmit = () => {
        sendFriendRequest(transformedUserFromApi.objPublicKey);
    };

    const friends = transformedUserFromApi.friends
        .map((friendKey) => {
            console.log('friendKey', friendKey.toBase58());
            return getPersonByPublicKey(friendKey.toBase58());
        })
        .filter((friend) => friend !== undefined);

    return (
        <section>
            <ProfileHeader
                authUserId={transformedUserFromApi?.id}
                name={transformedUserFromApi?.name}
                imgUrl={transformedUserFromApi?.avatar}
                bio={transformedUserFromApi?.bio}
                handleButtonSubmit={handleButtonSubmit}
                isSendingFriendRequest={false}
                isFriend={isFriend}
                type="follow"
            />

            <div>
                <h2 className="head-text">Friends</h2>
                <div className="grid grid-cols-3 gap-4">
                    {friends.map((friend, index) => (
                        <Link to={`/user-profile/${friend.publicKey}`}>
                            <div
                                key={'friend' + index + friend.account.name}
                                className="flex flex-col items-center"
                            >
                                <img
                                    src={friend.account.avatar}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            'https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg';
                                    }}
                                    alt="avatar"
                                    className="w-16 h-16 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
                                />
                                <p className="text-light-1">
                                    {friend.account.name}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default UserProfile;
