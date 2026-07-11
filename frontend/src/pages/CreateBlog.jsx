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

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "https://mern-blog-platform-jk6t.onrender.com/api/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", res.data);
      alert("✅ Blog created successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Upload Error:", err);

      if (err.response) {
        console.log(err.response.data);
        alert(err.response.data.message || JSON.stringify(err.response.data));
      } else {
        alert("Something went wrong. Check the console.");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br />
        <br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <br />
        <br />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default CreateBlog;