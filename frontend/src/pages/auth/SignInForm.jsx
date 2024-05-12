import React, { useState } from "react";

function SignInForm({ user, btnTitle }) {
  const [password, setPassword] = useState(user?.password || "");
  const [email, setEmail] = useState(user?.name || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the form submission, such as sending data to a server
    console.log({ profilePhoto, password, name, bio });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-light-2">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-light-2">Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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

export default SignInForm;
