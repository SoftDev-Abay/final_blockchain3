import React from "react";
import SignInForm from "./SignInForm";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../../idl.json";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

const SignIn = () => {
  //   const navigate = useNavigate();

  const anchorWallet = useAnchorWallet();

  const connection = useConnection();

  const { publicKey } = useWallet();

  console.log("publicKey:", publicKey.toString());

  return (
    <div className="bg-dark-1 min-h-[100vh]">
      <main className=" mx-auto flex max-w-3xl flex-col justify-start  px-10 py-20">
        <h1 className="head-text">Authorization</h1>
        <p className="mt-3 text-base-regular text-light-2">
          Login to your account
        </p>
        <section className="mt-9 bg-dark-2 p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-light-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-light-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            {walletAddress && (
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-light-2">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="account-form_input p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 bg-primary-500"
            >
              {btnTitle}
            </button>
          </form>

          <button className="btn">Connect</button>

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
