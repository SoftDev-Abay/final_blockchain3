import React from "react";
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

  const handleSubmit = async (data) => {
    try {
      const userData = await login(data).unwrap();
      console.log(userData);

      dispatch(setCredentials({ ...userData, email: data.email, walletAddress: data.walletAddress }));
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
