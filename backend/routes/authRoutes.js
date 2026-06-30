const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// ---------------- AUTH ROUTES ----------------

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// ---------------- PROTECTED ROUTE ----------------
// GET profile (only logged-in users)
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

module.exports = router;