const express = require("express");
const router = express.Router();

const { getUserProfile } = require("../controllers/userController");

// GET USER PROFILE
router.get("/:id", getUserProfile);

module.exports = router;