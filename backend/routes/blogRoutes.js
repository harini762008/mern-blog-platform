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

// DEBUG
console.log("createBlog:", createBlog);
console.log("getBlogs:", getBlogs);
console.log("getBlog:", getBlog);
console.log("updateBlog:", updateBlog);
console.log("deleteBlog:", deleteBlog);
console.log("addComment:", addComment);
console.log("toggleLike:", toggleLike);
console.log("protect:", protect);
console.log("upload:", upload);

// GET
router.get("/", getBlogs);
router.get("/:id", getBlog);

// CREATE
router.post("/", protect, upload.single("image"), createBlog);

// UPDATE
router.put("/:id", protect, updateBlog);

// DELETE
router.delete("/:id", protect, deleteBlog);

// COMMENT
router.post("/:id/comment", protect, addComment);

// LIKE
router.put("/:id/like", protect, toggleLike);

module.exports = router;