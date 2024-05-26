import ProfileHeader from '../../shared/ProfileHeader';
import { useSelector } from 'react-redux';
import {
    selectCurrentUser,
    selectCurrentToken,
} from '../../features/auth/authSlice';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../features/users/usersApiSlice';
import { useSendFriendRequestMutation } from '../../features/friends/friendsApiSlice';
import { useEffect } from 'react';
function UserProfile() {
    const userId = useParams().id;

    const user = useSelector(selectCurrentUser);

    const { data: userFromApi } = useGetUserQuery(userId);

    const isFriend = user?.friends.includes(userFromApi?._id);

    console.log('userFromApi', userFromApi);
    console.log('user', user);

    const [
        sendFriendRequest,
        {
            isSuccess: isSendSuccess,
            isError: isSendError,
            error: senderror,
            isLoading: isSendLoading,
        },
    ] = useSendFriendRequestMutation();

    const handleButtonSubmit = () =>
        sendFriendRequest({
            request: userFromApi?._id,
            receiver: user?._id,
        });

    useEffect(() => {
        if (isSendSuccess) {
            alert('Friend request sent successfully');
        }
    }, [isSendSuccess, isSendError]);

    return (
        <section>
            <ProfileHeader
                accountId={userFromApi?.id}
                authUserId={userFromApi?.id}
                name={userFromApi?.name}
                email={userFromApi?.email}
                imgUrl={userFromApi?.profilePicture}
                bio={userFromApi?.bio}
                handleButtonSubmit={handleButtonSubmit}
                isSendingFriendRequest={isSendLoading}
                isFriend={isFriend}
                type="follow"
            />
        </section>
    );
}
export default UserProfile;
