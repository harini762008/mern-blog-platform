const token = localStorage.getItem("token");

const toggleLike = async () => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/blogs/${id}/like`,
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