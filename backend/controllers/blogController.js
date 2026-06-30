const Blog = require("../models/Blog");

// CREATE
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate("comments.user", "name email");

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// COMMENT
const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    blog.comments.push({
      user: req.user.id,
      text: req.body.text,
    });

    await blog.save();

    const updated = await Blog.findById(req.params.id)
      .populate("comments.user", "name email");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❤️ LIKE / UNLIKE
const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    const userId = req.user.id;

    const alreadyLiked = blog.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.json({
      likesCount: blog.likes.length,
      liked: !alreadyLiked,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Like failed" });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  addComment,
  toggleLike,
};