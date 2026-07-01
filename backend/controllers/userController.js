const User = require("../models/user");
const Blog = require("../models/Blog");

// GET USER PROFILE + THEIR BLOGS
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const blogs = await Blog.find({
      author: userId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      user,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUserProfile,
};