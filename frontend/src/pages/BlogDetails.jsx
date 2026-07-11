import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `https://mern-blog-platform-jk6t.onrender.com/api/blogs/${id}`
      );

      setBlog(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    try {
      await axios.put(
        `https://mern-blog-platform-jk6t.onrender.com/api/blogs/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBlog();
    } catch (err) {
      console.log(err);
      alert("Like failed");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (!blog) return <h2>Blog not found.</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>{blog.title}</h1>

      {blog.image && (
        <img
          src={blog.image}
          alt="blog"
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      )}

      <p style={{ marginTop: "20px" }}>{blog.content}</p>

      <p>
        <strong>Author:</strong> {blog.author?.name}
      </p>

      <button onClick={toggleLike}>
        ❤️ {blog.likes.length}
      </button>

      <hr />

      <h3>Comments</h3>

      {blog.comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        blog.comments.map((comment) => (
          <div key={comment._id}>
            <strong>{comment.user?.name}</strong>
            <p>{comment.text}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default BlogDetails;