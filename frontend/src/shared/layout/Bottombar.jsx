import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../constants";

function Bottombar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              to={link.route}
              key={link.label}
              className={`bottombar_link ${isActive ? "bg-primary-500" : ""}`}
            >
              <img src={link.imgURL} alt={link.label} width={24} height={24} />
              <p className="text-light-1 text-subtle-medium max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
