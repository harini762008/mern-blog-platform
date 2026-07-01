import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function BlogCard({ blog }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(blog.likes?.length || 0);
  const [liked, setLiked] = useState(false);

  const token = localStorage.getItem("token");

  // ❤️ LIKE FUNCTION
  const toggleLike = async (e) => {
    e.stopPropagation();

    try {
      const res = await axios.put(
        `https://mern-blog-platform-jk6t.onrender.com/api/blogs/${blog._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikes(res.data.likesCount);
      setLiked(res.data.liked);
    } catch (err) {
      console.log(err);
      alert("Like failed");
    }
  };

  return (
    <div
      onClick={() => navigate(`/blogs/${blog._id}`)}
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "10px",
        cursor: "pointer",
        background: "#fff",
      }}
    >
      <h2>{blog.title}</h2>

      {blog.image && (
        <img
          src={blog.image}
          alt="blog"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        />
      )}

      <p style={{ marginTop: "10px" }}>
        {blog.content.substring(0, 120)}...
      </p>

      <small>By {blog.author?.name}</small>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <button
          onClick={toggleLike}
          style={{
            background: liked ? "red" : "#eee",
            color: liked ? "#fff" : "#000",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ❤️ {likes}
        </button>

        <button
          onClick={() => navigate(`/blogs/${blog._id}`)}
          style={{
            background: "#333",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default BlogCard;