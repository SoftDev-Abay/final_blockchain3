import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Searchbar from "../../components/Searchbar";
import UserCard from "../../components/UserCard";
import Pagination from "../../components/Pagination";
import { selectCurrentUser } from "../../features/auth/authSlice";

// Static user data
const staticUsers = [
  {
    id: 1,
    name: "Alice",
    email: "alice123",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvCBZNzX3stNo3MlHYc9fnpNpFHS9GRkzKiCiyK4vT8Q&s",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob456",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvCBZNzX3stNo3MlHYc9fnpNpFHS9GRkzKiCiyK4vT8Q&s",
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie789",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvCBZNzX3stNo3MlHYc9fnpNpFHS9GRkzKiCiyK4vT8Q&s",
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const [result, setResult] = useState({ users: [], isNext: false });
  const user = useSelector(selectCurrentUser);
  const query = useQuery();

  const searchString = query.get("q");
  const pageNumber = query.get("page") ? parseInt(query.get("page"), 10) : 1;

  useEffect(() => {
    // Simulating a fetch with static data
    const filteredUsers = staticUsers.filter(
      (user) =>
        !searchString ||
        user.name.toLowerCase().includes(searchString.toLowerCase())
    );

    setResult({
      users: filteredUsers,
      isNext: false, // Static example, no pagination
    });

    // Uncomment when backend is ready
    /*
    async function getUsers() {
      const result = await fetchUsers({
        userId: user.id,
        searchString,
        pageNumber,
        pageSize: 25,
      });

      setResult(result);
    }

    getUsers();
    */
  }, [user.id, searchString, pageNumber]);

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
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

      <Pagination
        path="search"
        pageNumber={pageNumber}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Search;
