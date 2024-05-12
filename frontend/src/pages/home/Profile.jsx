import ProfileHeader from "../../shared/ProfileHeader";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../../features/auth/authSlice";

function Profile() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  if (!user) return null;

  return (
    <section>
      <ProfileHeader
        accountId={user?.id}
        authUserId={user?.id}
        name={user?.name}
        email={user?.email}
        imgUrl={user?.profilePicture}
        bio={user?.bio}
      />
    </section>
  );
}
export default Profile;
