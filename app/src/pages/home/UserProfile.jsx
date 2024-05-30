import ProfileHeader from '../../shared/ProfileHeader';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBlog } from 'src/context/Blog';
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

    const { getPersonByPublicKey, sendFriendRequest } = useBlog();

    const userFromApi = getPersonByPublicKey(userPublicKey);

    const transformedUserFromApi = {
        ...userFromApi.account,
        publicKey: userFromApi.publicKey.toBase58(),
        objPublicKey: userFromApi.publicKey,
    };

    const [isFriend, setIsFriend] = useState(false);

    const handleButtonSubmit = () => {
        sendFriendRequest(transformedUserFromApi.objPublicKey);
    };

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
        </section>
    );
}
export default UserProfile;
