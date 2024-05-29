import React, { useState, useEffect } from "react";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

function SignInForm({ btnTitle, submitData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          const response = await window.solana.connect();
          setWalletAddress(response.publicKey.toString());
        } catch (error) {
          console.error("User denied account access", error);
        }
      } else {
        console.error("Phantom wallet is not installed");
      }
    };

    connectWallet();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the form submission, such as sending data to a server

    const data = {
      email: email,
      password: password,
      walletAddress: walletAddress,
    };

    submitData(data);

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
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

      {walletAddress && (
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-light-2">Wallet Address</label>
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
  );
}

export default SignInForm;
