import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";

function Topbar() {
  const dispatch = useDispatch();
  return (
    <nav className="topbar">
      <Link to="/" className="flex items-center gap-4">
        <img src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          {/* Example logout button; replace with actual functionality if needed */}
          <div
            className="flex cursor-pointer"
            onClick={() => {
              dispatch(logOut());
            }}
          >
            <img src="/assets/logout.svg" alt="logout" width={24} height={24} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
