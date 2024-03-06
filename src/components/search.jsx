import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { set } from "../store/slice/appslice";

const Search = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  let gitUser = async (searchQuery) => {
    const githubkey = import.meta.env.VITE_GITHUB_API_KEY;
    const octokit = new Octokit({
      auth: githubkey,
    });

    try {
      let { data } = await octokit.request("GET /search/users", {
        q: searchQuery,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      dispatch(set(data.items));
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    if (query && query != "") {
      const timer = setTimeout(() => {
        gitUser(query);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [query]);

  return (
    <div className="flex flex-col justify-center items-center mt-2 ">
      <input
        className="border-teal-700 border-solid border-2 pl-3 rounded-lg h-[50px] w-[250px]"
        type="text"
        value={query}
        placeholder="Search Git User"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
