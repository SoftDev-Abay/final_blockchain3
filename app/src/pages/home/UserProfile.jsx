import ProfileHeader from "../../shared/ProfileHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBlog } from "src/context/Blog";
// mock data
const user = {
  id: "1",
  name: "John Doe",
  email: "john.doe.15@gmail.com",
  profilePicture: "",
  bio: "I'm a software engineer and a tech enthusiast.",
};

const userFromApi = {
  id: "2",
  name: "Diana Johnson",
  email: "diana.johnson.15@gmail.com",
  profilePicture: "",
  bio: "I'm a sufferer of the imposter syndrome.",
};

function UserProfile() {
  const userPublicKey = useParams().publicKey;

  const [isFriend, setIsFriend] = useState(false);

  const sendFriendRequest = (data) => {};

  const handleButtonSubmit = () => {
    sendFriendRequest({
      initiator: user?.walletAddress,
      receiver: userFromApi?.walletAddress,
    });
  };

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
        isSendingFriendRequest={false}
        isFriend={isFriend}
        type="follow"
      />
    </section>
  );
}
export default UserProfile;
