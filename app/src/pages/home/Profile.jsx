import ProfileHeader from "../../shared/ProfileHeader";

//  mock data

const user = {
  id: "1",
  name: "John Doe",
  email: "john.doe.15@gmail.com",
  profilePicture: "",
  bio: "I'm a software engineer and a tech enthusiast.",
};

function Profile() {
  if (!user) return null;

  console.log(user);

  return (
    <section>
      <ProfileHeader
        accountId={user?.id}
        authUserId={user?.id}
        name={user?.name}
        email={user?.email}
        imgUrl={user?.profilePicture}
        bio={user?.bio}
        handleButtonSubmit={() => {}}
        type="profile"
      />
    </section>
  );
}
export default Profile;
