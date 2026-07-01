import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `https://mern-blog-platform-jk6t.onrender.com/api/users/${id}`
      );

      setUser(res.data.user);
      setBlogs(res.data.blogs);
    } catch (err) {
      alert("Failed to load profile");
    }
  };

  if (!user) return <h2>Loading profile...</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>👤 {user.name}</h1>
      <p>{user.email}</p>

      <hr />

      <h2>📝 Blogs by {user.name}</h2>

      {blogs.length === 0 ? (
        <p>No blogs yet</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;