import React, { useState } from "react";

function SignUpForm({ user, btnTitle, submitData }) {
  const [profilePhoto, setProfilePhoto] = useState(user?.image || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the form submission, such as sending data to a server

    // "name": "Nurzhau",
    // "email": "email@gmail.com",
    // "password": "password",
    // "bio": "something about me",
    // "profilePicture": "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D"

    const data = {
      name: username,
      email: email,
      password: password,
      bio: bio,
      profilePicture: profilePhoto,
    };

    submitData(data);

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex items-center gap-4">
        {profilePhoto.length > 0 ? (
          <img src={profilePhoto} className="w-24 h-24 rounded-full" />
        ) : (
          <img src="/assets/profile.svg" className="w-6 h-6" />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-light-2">Avatar Url</label>
        <input
          type="text"
          value={profilePhoto}
          className="account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          onChange={() => {
            setProfilePhoto(event.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-light-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=" account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-light-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-light-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* confirm password */}

      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-light-2">
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-light-2">Bio</label>
        <textarea
          rows="3"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 bg-primary-500"
      >
        {btnTitle}
      </button>
    </form>
  );
}

export default SignUpForm;
