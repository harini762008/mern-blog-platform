import axios from "axios";

const BlogDetails = () => {
  const token = localStorage.getItem("token");

  const toggleLike = async () => {
    try {
      const res = await axios.put(
        `https://mern-blog-platform-jk6t.onrender.com/api/blogs/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikeInfo(res.data);
    } catch (err) {
      console.log(err);
      alert("Like failed");
    }
  };

  return (
    <div>
      Blog Details
    </div>
  );
};

export default BlogDetails;