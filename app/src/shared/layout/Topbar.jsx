import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { Button } from "src/components/Button";
import { useBlog } from "src/context/Blog";
import { useHistory } from "react-router-dom";

function Topbar() {
  const history = useHistory();
  const [connecting, setConnecting] = useState(false);
  const { connected, select } = useWallet();
  const { user, initialized, initUser, setShowModal } = useBlog();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const onConnect = () => {
    setConnecting(true);
    select(PhantomWalletName);
  };

  useEffect(() => {
    if (user) {
      setConnecting(false);
    }
  }, [user]);

  return (
    <nav className="topbar">
      <Link to="/" className="flex items-center gap-4">
        <img src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <div className="block">
            <div className="flex cursor-pointer">
              {connected ? (
                <div className="flex items-center">
                  <p className="font-bold text-sm ml-2 capitalize underlinepink">
                    Home
                  </p>
                  <p className="font-bold text-sm ml-2 capitalize mr-4 underlinepink">
                    Blog
                  </p>
                  <img
                    src={user?.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
                  />
                  <p className="font-bold text-sm ml-2 capitalize">
                    {user?.name}
                  </p>
                  {initialized ? (
                    <span>Logged in</span>
                  ) : (
                    <Button
                      className="ml-3 mr-2"
                      onClick={() => {
                        initUser();
                      }}
                    >
                      Initialize User
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  loading={connecting}
                  className="w-28"
                  onClick={onConnect}
                  leftIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  }
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="block md:hidden">
            <div className="flex cursor-pointer" onClick={() => {}}>
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
