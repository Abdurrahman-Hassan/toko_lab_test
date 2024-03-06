import { useSelector } from "react-redux";
import SingleItem from "./SingleItem";

const List = () => {
  const users = useSelector((state) => state.appslice);
  if (users.length > 0) {
    return (
      <div className="listdiv m-5 flex flex-row justify-center items-center flex-wrap gap-10">
        {users.map((user, index) => {
          return <SingleItem key={index} gituser={user} index={index} />;
        })}
      </div>
    );
  }
};

export default List;
