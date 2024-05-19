import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Spinner} from "flowbite-react";
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

  if (loading) return (<div className="flex justify-center items-center min-h-screen">
    <Spinner size="xl"/>
  </div>);
  if (error) return <div>Error occurred while fetching post data.</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <main className="p-3 flex-col max-w-6xl mx-auto min-h-screen">

        <h1 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl font-black">{post && post.title}</h1>
    </main>
  );
}
