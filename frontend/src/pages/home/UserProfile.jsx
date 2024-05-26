import ProfileHeader from "../../shared/ProfileHeader";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../../features/auth/authSlice";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../features/users/usersApiSlice";

function UserProfile() {
  const userId = useParams().id;

  const user = useSelector(selectCurrentUser);

  const { data: userFromApi } = useGetUserQuery(userId);

  return (
    <section>
      <ProfileHeader
        accountId={userFromApi?.id}
        authUserId={userFromApi?.id}
        name={userFromApi?.name}
        email={userFromApi?.email}
        imgUrl={userFromApi?.profilePicture}
        bio={userFromApi?.bio}
      />
    </section>
  );
}
export default UserProfile;
