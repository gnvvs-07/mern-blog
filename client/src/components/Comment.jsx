import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
export default function Comment({ comment }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        // get users
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="border-b border-gray-500">
      <div className="flex justify-between mt-2 ">
        <div className="flex gap-2 items-center">
          {/* profile picture*/}
          <img
            src={user.profilePicture}
            alt={user.username}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <span>{user ? `@${user.username}` : "Anonymous"}</span>
          </div>
        </div>
        <div className="mt-2">
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>
      </div>

      <div className="p-3 mx-auto my-1">
        {currentUser ? (
          <span>{comment.content}</span>
        ) : (
          <Link to={"/sign-up"} className="dark:text-gray-600">
            sign up to see comment
          </Link>
        )}
      </div>
    </div>
  );
}
