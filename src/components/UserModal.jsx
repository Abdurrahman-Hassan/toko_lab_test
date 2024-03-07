import { useEffect, useState } from "react";

const UserModal = ({ isdialog, setisdialog, gituser }) => {
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  let followerfetch = async () => {
    console.log(gituser.followers_url);
    const githubkey = import.meta.env.VITE_GITHUB_API_KEY;

    let data = await fetch(
      `https://api.github.com/users/${gituser?.login}/followers`,
      {
        headers: {
          Authorization: `token ${githubkey}`,
        },
      }
    );
    const follower = await data.json();
    setFollower(follower.length);
  };

  let followingfetch = async () => {
    const githubkey = import.meta.env.VITE_GITHUB_API_KEY;

    try {

      let data = await fetch(
        `https://api.github.com/users/${gituser?.login}/following`,
        {
          headers: {
            Authorization: `token ${githubkey}`,
          },
        }
      );
      const following = await data.json();
      setFollowing(following.length);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    if (gituser) {
      followerfetch();
      followingfetch();
    }
  }, []);

  useEffect(() => {
    document.querySelector("html").classList.add("controlledclasshtml");

    document
      .getElementsByClassName("modalback")[0]
      .addEventListener("click", () => setisdialog(false));

    document
      .getElementsByClassName("listdiv")[0]
      .classList.add("controlledclass");

    return () => {
      document
        .getElementsByClassName("listdiv")[0]
        .classList.remove("controlledclass");
      document.querySelector("html").classList.remove("controlledclasshtml");
    };
  }, [isdialog]);

  return (
    <div className="modalback fixed flex justify-center items-center top-0 left-0 right-0 pointer-events-auto bottom-0 bg-black bg-opacity-75 w-[100vw] h-[100vh] overflow-hidden">
      <dialog
        open={isdialog}
        className="flex flex-col gap-2 justify-center items-center absolute opacity-100 sm:w-[400px] sm:h-[300px]"
      >
        <img
          className="w-[150px] h-[150px] rounded-full"
          src={gituser?.avatar_url}
          alt={gituser?.login}
        />

        <h2>{gituser?.login}</h2>
        <div className="flex flex-row gap-5">
          <p>followers: {follower}</p>
          <p>following: {following}</p>
        </div>
        <button
          className="border-teal-700 border-2 rounded-lg w-[80px] h-[40px] text-center flex flex-col justify-center items-center"
          onClick={() => {
            setisdialog(false);
          }}
        >
          OK
        </button>
      </dialog>
    </div>
  );
};

export default UserModal;
