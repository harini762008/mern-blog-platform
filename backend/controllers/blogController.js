const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.path : "",
      author: req.user.id,
    });

    const populatedBlog = await Blog.findById(blog._id).populate(
      "author",
      "name email"
    );

    res.status(201).json(populatedBlog);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};