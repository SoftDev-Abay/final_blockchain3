import React, { useState } from "react";

function SignUpForm({ user, btnTitle, submitData }) {
  const [profilePhoto, setProfilePhoto] = useState(user?.image || "");
  const [username, setUsername] = useState(user?.username || "");
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the form submission, such as sending data to a server
    submitData({ profilePhoto, username, name, bio });
    console.log({ profilePhoto, username, name, bio });
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
        <label className="text-sm font-semibold text-light-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
