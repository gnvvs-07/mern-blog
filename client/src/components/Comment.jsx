import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaEdit, FaThumbsUp } from "react-icons/fa";
import { Button, Textarea } from "flowbite-react";
import { MdOutlineDeleteForever } from "react-icons/md";
export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
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
  // handle edit function
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };
  // saving after editing
  const handleSave = async () => {
    try {
      // fetch the edited comment and save in the backend in json format
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onLike(comment._id)}
              className={`text-gray-400 hover:text-blue-500 ${
                currentUser &&
                comment.likes.includes(currentUser._id) &&
                "!text-blue-500"
              }`}
            >
              <FaThumbsUp className="text-sm" />
            </button>
            <p className="text-gray-500">
              {comment.numberOfLikes > 0 &&
                comment.numberOfLikes +
                  " " +
                  (comment.numberOfLikes === 1 ? "like" : "likes")}
            </p>
            {/* edit button */}
            {currentUser && currentUser._id === comment.userId && (
              <button
                type="button"
                title="edit"
                className="mx-5 text-green-500"
                onClick={handleEdit}
              >
                <FaEdit className="text-sm" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-2">
          {currentUser && currentUser._id === comment.userId && (
            <button type="button" title="edit" className="mx-5 text-red-500" onClick={()=>onDelete(comment._id)}>
              <MdOutlineDeleteForever className="text-xl" />
            </button>
          )}
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>
      </div>

      {isEditing ? (
        <>
          <Textarea
            className="w-full outline my-2 mx-auto"
            value={editedContent}
            onChange={(e) => {
              setEditedContent(e.target.value);
            }}
          />
          <div className="flex justify-between mb-1">
            {/* buttons for save and cnacel */}
            <Button outline color="success" onClick={handleSave}>
              Save
            </Button>
            <Button outline color="failure" onClick={() => setIsEditing(false)}>
              cancel
            </Button>
          </div>
        </>
      ) : (
        <div className="p-3 mx-auto my-1">
          {currentUser ? (
            <span>{comment.content}</span>
          ) : (
            <Link to={"/sign-up"} className="dark:text-gray-600">
              sign up to see comment
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
