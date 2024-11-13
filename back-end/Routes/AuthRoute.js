const express = require("express");
const router = express.Router();
const { Register, Login, RefreshToken } = require("../Controllers/auth");

router.post("/register", Register);
router.post("/login", Login);
router.post("/refresh", RefreshToken);

module.exports = router;
