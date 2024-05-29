import ProfileHeader from '../../shared/ProfileHeader';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../features/users/usersApiSlice';
import { useEffect, useState } from 'react';
import { useBlog } from '../../features/friends/BlogContext';
import { PublicKey } from '@solana/web3.js';

function UserProfile() {

    const userId = useParams().id;
    const user = useSelector(selectCurrentUser);
    const { data: userFromApi } = useGetUserQuery(userId);
    const [isFriend, setIsFriend] = useState(user?.friends.includes(userFromApi?._id));

    const { sendRequest, friends } = useBlog();

    useEffect(() => {
        if (userFromApi) {
            const isUserFriend = friends.some(friend => friend.equals(new PublicKey(userFromApi.walletAddress)));
            setIsFriend(isUserFriend);
        }
    }, [userFromApi, friends]);

    const handleButtonSubmit = async () => {
        try {
            await sendRequest(new PublicKey(userFromApi.walletAddress));
            setIsFriend(true);
        } catch (error) {
            console.error('Failed to send friend request:', error);
            alert('Failed to send friend request');
        }
    };

    return (
        <section>
            {userFromApi && (
                <ProfileHeader
                    accountId={userFromApi.id}
                    authUserId={userFromApi.id}
                    name={userFromApi.name}
                    email={userFromApi.email}
                    imgUrl={userFromApi.profilePicture}
                    bio={userFromApi.bio}
                    handleButtonSubmit={handleButtonSubmit}
                    isFriend={isFriend}
                    type="follow"
                />
            )}
        </section>
    );
}

export default UserProfile;
