const express = require("express");
const router = express.Router();
const { forget,resetPassword } = require("../controllers/forgetPasswdController");

// Định nghĩa route POST /api/auth/login
router.post("/forget", forget);

router.post("/resetPassword", resetPassword);

module.exports = router;