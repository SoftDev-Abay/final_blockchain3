import React, { useEffect } from "react";
import SignInForm from "./SignInForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../features/auth/authApiSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

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

  const handleSubmit = async (data) => {
    try {
      const userData = await login(data).unwrap();
      console.log(userData);

      dispatch(setCredentials({ ...userData, email: data.email }));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-1 min-h-[100vh]">
      <main className=" mx-auto flex max-w-3xl flex-col justify-start  px-10 py-20">
        <h1 className="head-text">Authorization</h1>
        <p className="mt-3 text-base-regular text-light-2">
          Login to your account
        </p>
        <section className="mt-9 bg-dark-2 p-10">
          <SignInForm
            user={userData}
            btnTitle="Sign in"
            submitData={handleSubmit}
          />
          <p className="text-sm text-light-2 mt-5 text-right">
            Don't have an account?{" "}
            <Link to="/auth/sign-up" className="text-primary-500">
              Sign Up
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
};

export default SignIn;
