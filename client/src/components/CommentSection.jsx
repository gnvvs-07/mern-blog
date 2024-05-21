import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LiaCommentSolid } from "react-icons/lia";
import Comment from "../components/Comment";
import { useNavigate } from "react-router-dom";
export default function CommentSection({ postId }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false); // State for error alert
  const overlayRef = useRef(null);
  // console.log(comments)
  function showOverlay() {
    var originalImageSrc = document.getElementById("image").src;
    document.getElementById("enlarged-image").src = originalImageSrc;
    overlayRef.current.style.display = "block";
    document.body.classList.add("overlay-active");
  }

  function hideOverlay() {
    overlayRef.current.style.display = "none";
    document.body.classList.remove("overlay-active");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length < 1) {
      alert("Comment is required");
    } else if (comment.length > 250) {
      return;
    }
    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setShowSuccessAlert(true);
        setComments([data, ...comments]);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
      }
    } catch (error) {
      setCommentError(error.message);
      setShowErrorAlert(true); // Show error alert
      setTimeout(() => {
        setShowErrorAlert(false); // Hide error alert after 5 seconds
      }, 5000);
    }
  };
  useEffect(() => {
    // get comments
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  // handle comments
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-2">
      <div
        id="overlay"
        ref={overlayRef}
        className="overlay"
        onClick={hideOverlay}
      >
        <img id="enlarged-image" src="" alt="Enlarged Image" />
      </div>
      {currentUser ? (
        <div className="flex gap-1 text-gray-400 text-sm my-2 text-center">
          <p>🟢Signed in as :</p>
          <img
            src={currentUser.profilePicture}
            className="h-5 w-5 object-cover rounded-full cursor-zoom-in"
            alt=""
            onClick={showOverlay}
            id="image"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-cyan-500 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex justify-between text-gray-500">
          <h3>🔴Sign in to comment</h3>
          <Link to={"/sign-in"}>Sign In</Link>
        </div>
      )}
      {currentUser && (
        <form className="border p-4 rounded-lg" onSubmit={handleSubmit}>
          <Textarea
            placeholder="Add a comment"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-cyan-500"
            maxLength={250}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex mt-2 justify-between gap-2 border-t border-slate-700 ">
            <p className="mt-3">{250 - comment.length} Letters left</p>
            <Button
              className="mt-2"
              outline
              gradientDuoTone="purpleToPink"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      )}
      {/* Show success alert only when showSuccessAlert is true */}
      {showSuccessAlert && (
        <Alert color="success" className="mt-5">
          Comment Posted Successfully
        </Alert>
      )}
      {/* Show error alert only when showErrorAlert is true */}
      {showErrorAlert && (
        <Alert color="failure" className="mt-5">
          Error While Posting
        </Alert>
      )}
      {comments.length === 0 ? (
        <p className="text-gray-500">No Comments Yet</p>
      ) : (
        <>
          <div className="">
            <div className="flex p-2 border-b border-gray-500 justify-between">
              <div className="flex gap-2">
                <p className="text-gray-500 font-semibold">comments</p>
                <p>{comments.length}</p>
              </div>
              <LiaCommentSolid className="mt-1" color="gray" />
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onLike={handleLike} />
          ))}
        </>
      )}
    </div>
  );
}
