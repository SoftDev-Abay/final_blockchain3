import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { ethers } from "ethers";

function Topbar() {
  const dispatch = useDispatch();

  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Function to connect/disconnect the wallet
  async function connectWallet() {
    if (!connected) {
      // Connect the wallet using ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      console.log("Connected wallet address: ", _walletAddress);

      setConnected(true);
      setWalletAddress(_walletAddress);
    } else {
      // Disconnect the wallet
      setConnected(false);
      setWalletAddress("");
    }
  }

  return (
    <nav className="topbar">
      <Link to="/" className="flex items-center gap-4">
        <img src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <div className="block ">
            <div
              className="flex cursor-pointer"
              onClick={connectWallet} // Calls disconnectWallet on click when wallet is connected
            >
              {connected ? (
                <img
                  src="/assets/wallet-check.svg"
                  alt="connected wallet"
                  width={30}
                  height={30}
                />
              ) : (
                <img
                  src="/assets/wallet.svg"
                  alt="connected wallet"
                  width={30}
                  height={30}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="block md:hidden">
            <div
              className="flex cursor-pointer"
              onClick={() => {
                dispatch(logOut());
              }}
            >
              <img
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
