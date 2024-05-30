import React from "react";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  //   const navigate = useNavigate();
  const user = {
    id: 1,
    username: "john_doe",
    imageUrl: "",
  };

  const userInfo = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstname || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  const handleSubmit = (data) => {};

  return (
    <div className="bg-dark-1 min-h-[100vh]">
      <main className=" mx-auto flex max-w-3xl flex-col justify-start  px-10 py-20">
        <h1 className="head-text">Registration</h1>
        <p className="mt-3 text-base-regular text-light-2">
          Complete your profile now to use Network
        </p>
        <section className="mt-9 bg-dark-2 p-10">
          <SignUpForm
            user={userData}
            btnTitle="Sign up"
            submitData={handleSubmit}
          />
          <p className="text-sm text-light-2 mt-5 text-right">
            Already have an account?{" "}
            <Link to="/auth/sign-in" className="text-primary-500">
              Sign In
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
