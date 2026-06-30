const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  addComment,
  toggleLike,
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// GET
router.get("/", getBlogs);
router.get("/:id", getBlog);

// CREATE (WITH IMAGE)
router.post("/", protect, upload.single("image"), createBlog);

// UPDATE / DELETE
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

// COMMENTS
router.post("/:id/comment", protect, addComment);

// LIKE
router.put("/:id/like", protect, toggleLike);

module.exports = router;