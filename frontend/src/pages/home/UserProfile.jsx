import ProfileHeader from '../../shared/ProfileHeader';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../features/users/usersApiSlice';
import { useEffect, useState } from 'react';
import { sendFriendRequest } from '../../features/friends/friendsContract'; 
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

function UserProfile() {
    const userId = useParams().id;
    console.log(userId)
    const user = useSelector(selectCurrentUser);
    const { data: userFromApi } = useGetUserQuery(userId);
    console.log("UserFromAPI", userFromApi?.walletAddress)
    const [isFriend, setIsFriend] = useState(
        user?.friends.includes(userFromApi?._id)
    );

    const connection = useConnection();


    const [anchorWallet, setAnchorWallet] = useState(null);
    useEffect(() => {
        const connectWallet = async () => {
            if (window.solana && window.solana.isPhantom) {
                try {
                    const response = await window.solana.connect();
                    setAnchorWallet(response);
                } catch (error) {
                    console.error("Error connecting wallet:", error);
                }
            } else {
                console.error("Phantom wallet is not installed");
        }
        };

        connectWallet();
    }, []);

    console.log("anchorWallet", anchorWallet)
    console.log("connection", connection)


    const handleButtonSubmit = async () => {
        try {
            await sendFriendRequest(connection, anchorWallet, new PublicKey(userFromApi?.walletAddress));
            alert('Friend request sent successfully');
            setIsFriend(true);
        } catch (error) {
            console.error('Failed to send friend request:', error);
            alert('Failed to send friend request');
        }
    };

    // Render the ProfileHeader only when anchorWallet is set
    return (
        <section>
            {anchorWallet && (
                <ProfileHeader
                    accountId={userFromApi?.id}
                    authUserId={userFromApi?.id}
                    name={userFromApi?.name}
                    email={userFromApi?.email}
                    imgUrl={userFromApi?.profilePicture}
                    bio={userFromApi?.bio}
                    handleButtonSubmit={handleButtonSubmit}
                    isFriend={isFriend}
                    type="follow"
                />
            )}
        </section>
    );
}

export default UserProfile;
