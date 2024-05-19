import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar({ routeType }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        navigate(`/${routeType}?q=` + search);
      } else {
        navigate(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType, navigate]);

  return (
    <div className="searchbar">
      <img
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType !== "/search" ? "Search communities" : "Search creators"
        }`}
        className="no-focus searchbar_input"
      />
    </div>
  );
}

export default Searchbar;
