import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (data.posts.length > 0) {
          setPost(data.posts[0]);
        }
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  if (error) return <div>Error occurred while fetching post data.</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <main className="p-3 flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl font-black cursor-default border-b border-slate-700">
        {post && post.title}
      </h1>
      {/* category search button */}
      <Link
        to={`/search?category=${post && post.category}`}
        className="mt-5 flex justify-center"
      >
        <Button gradientDuoTone="purpleToPink" className="h-10">
          {post && post.category}
        </Button>
      </Link>
      {/* post image */}
      <img
        src={post && post.image}
        alt="postimage.png"
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-700 mx-auto w-full max-w-2xl text-xs">
        <span className="italic">
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="itlic">
          {post && (post.content.length / 1000).toFixed(0)} mins to read
        </span>
      </div>
      {/* content */}
      <div className="p-3 mx-auto max-w-2xl a-full post-content"  dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
      <div className="">
        <CallToAction/>
      </div>
      <CommentSection postId={post._id}/>
    </main>
  );
}
