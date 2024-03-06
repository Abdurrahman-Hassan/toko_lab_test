import { useState } from "react";
import UserModal from "./UserModal";

const SingleItem = ({ gituser }) => {
  const [isDialog, setIsDialog] = useState(false);
  return (
    <div className="singleitem flex flex-col gap-1 justify-center items-center w-[200px] h-[200px] rounded-2xl text-white">
      <img
        className="w-[100px] h-[100px] rounded-full"
        src={gituser?.avatar_url}
        alt={gituser?.login}
      />

      <h2
      className="cursor-pointer"
        onClick={() => {
          setIsDialog(true);
        }}
      >
        {gituser?.login}
      </h2>
      <a
        className="border-white border-2 rounded-lg w-[80px] h-[40px] text-center flex flex-col justify-center items-center"
        href={gituser?.html_url}
        target="_blank"
      >
        Github
      </a>
      {gituser && isDialog && (
        <UserModal
          isdialog={isDialog}
          setisdialog={setIsDialog}
          gituser={gituser}
        />
      )}
    </div>
  );
};

export default SingleItem;
