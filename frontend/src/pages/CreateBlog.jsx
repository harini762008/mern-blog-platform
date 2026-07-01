import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      await axios.post(
        "https://mern-blog-platform-jk6t.onrender.com/api/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Blog created!");
      navigate("/home");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default CreateBlog;