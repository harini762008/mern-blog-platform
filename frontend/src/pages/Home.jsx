import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";

function Home() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://mern-blog-platform-jk6t.onrender.com/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📝 MERN Blog Platform</h1>

      <div style={{ margin: "20px 0" }}>
        <Link to="/create">
          <button>Create New Blog</button>
        </Link>

        <button
          onClick={logout}
          style={{ marginLeft: "10px" }}
        >
          Logout
        </button>
      </div>

      <hr />

      {loading ? (
        <h3>Loading Blogs...</h3>
      ) : blogs.length === 0 ? (
        <h3>No blogs available.</h3>
      ) : (
        blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))
      )}
    </div>
  );
}

export default Home;