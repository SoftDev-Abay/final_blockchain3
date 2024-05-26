import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Searchbar from "../../components/Searchbar";
import UserCard from "../../components/UserCard";
import { useSearchUsersQuery } from "../../features/users/usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const [result, setResult] = useState([]);
  const query = useQuery();

  const searchString = query.get("q") || "";

  const { data, error, isSuccess, isLoading } =
    useSearchUsersQuery(searchString);

  useEffect(() => {
    if (isSuccess) {
      setResult(data);
    }
  }, [searchString]);
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {isLoading ? (
          <div className="flex justify-center">
            <PulseLoader color={"#FFF"} />
          </div>
        ) : error ? (
          <p className="no-result">Error</p>
        ) : result.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                email={person.email}
                imgUrl={person.image}
                isFriend={false}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Search;
