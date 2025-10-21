const express = require("express");
const router = express.Router();
const { regis } = require("../controllers/registerController");

// Định nghĩa route POST /api/auth/login
router.post("/register", regis);

module.exports = router;